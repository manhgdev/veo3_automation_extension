# Prompt / Spec: Backend API Remote Config cho VEO Extension

Dùng tài liệu này làm prompt cho AI hoặc brief cho dev backend khi triển khai endpoint config trên **zivofly.com**.

---

## Bối cảnh

Chrome extension **VEO Automation** tự động thao tác trên Google Flow (`labs.google`). Giao diện Google thay đổi thường xuyên, nên extension **không hard-code CSS selector** mà tải config từ server.

Extension đã được cấu hình gọi:

```
GET https://zivofly.com/shop/veo3/setting
```

File client: `shared/remote-config.js`  
Luồng gọi: `panel/app.js` và `background/background.js` → `getRemoteConfig()` → fetch URL trên.

**Lưu ý:** Endpoint này hiện **chưa bắt buộc phải chạy ngay** — extension vẫn load được, nhưng automation sẽ fail cho đến khi API trả JSON hợp lệ.

---

## Tổng quan domain zivofly.com trong extension

Extension **đã dùng zivofly.com** cho shop/UI và auth — **không chỉ** remote config. Phần lớn nằm trong `panel/app.js` (side panel). `shared/remote-config.js` chỉ phụ trách API selector automation.

### URL shop / UI (đã có trong code)

| URL | Vai trò | File / vị trí trong code |
|---|---|---|
| `https://zivofly.com/shop` | Trang shop chính; base URL cho auth API; link header side panel | `yd = "https://zivofly.com/shop"` — auth, header link `fA.href`, i18n `communityCtaLink` |
| `https://zivofly.com/shop/pricing` | Trang pricing; mở tab mới khi user nâng cấp | `h = "https://zivofly.com/shop/pricing"` — có thể kèm `?email=...` |
| `https://zivofly.com/shop/?report-bugs` | Báo lỗi extension | `window.open(...)` trong bug report modal |
| `https://zivofly.com/login` | Trang đăng nhập web (shop) | **Chưa hard-code** trong extension; login trong panel dùng modal + API bên dưới. Backend có thể redirect `/login` ↔ `/shop` tùy flow web. |

### API auth (base `https://zivofly.com/shop`)

Extension gọi trực tiếp từ side panel (không qua `remote-config.js`):

| Method | Endpoint | Mục đích |
|---|---|---|
| `POST` | `/api/auth/login` | Body `{ "email": "..." }` → trả `{ "accessToken": "..." }` |
| `GET` | `/api/auth/plan` | Header `Authorization: Bearer <token>` → trả `{ "active": true/false }` (Pro/plan) |

Token lưu `chrome.storage.local`: keys `auth-access-token`, `auth-email`.

### URL remote config (mới thêm)

| URL | Vai trò | File |
|---|---|---|
| `https://zivofly.com/shop/veo3/setting` | API JSON selectors cho automation Google Flow | `shared/remote-config.js` |

### Phân tách trách nhiệm

```
zivofly.com
├── /login                          → Trang web đăng nhập (UI)
├── /shop                           → Shop, header link, base auth API
│   ├── /pricing                    → Pricing (+ ?email=)
│   ├── /?report-bugs               → Form báo lỗi
│   ├── /api/auth/login             → API login extension
│   ├── /api/auth/plan              → API kiểm tra gói Pro
│   └── /veo3/setting               → API config selectors (extension automation)
```

**Remote config** chỉ phục vụ automation DOM trên `labs.google` — **không** lưu prompt/model/setting user. Auth và pricing là luồng riêng, đã trỏ zivofly từ trước.

**Quyền extension:** `manifest.json` có `host_permissions: *://zivofly.com/*` — cover cả shop UI fetch, auth API và remote config.

---

## Yêu cầu endpoint

### Request

| Thuộc tính | Giá trị |
|---|---|
| Method | `GET` |
| URL | `https://zivofly.com/shop/veo3/setting` |
| Header bắt buộc | `X-Client-Secret: YES_THAT_IS_VERY_EASY_RIGHT_?!$` |
| Body | Không có |

### Response thành công

| Thuộc tính | Giá trị |
|---|---|
| Status | `200 OK` |
| Content-Type | `application/json; charset=utf-8` |
| Body | JSON object (schema bên dưới) |

### Response lỗi

| Status | Khi nào |
|---|---|
| `401` / `403` | Thiếu hoặc sai `X-Client-Secret` |
| `404` | Endpoint chưa triển khai |
| `500` | Lỗi server |

Extension **không parse message lỗi** — chỉ cần `response.ok === false` là bỏ qua và trả `null` cho UI. Message lỗi chỉ phục vụ debug.

---

## Schema JSON (bắt buộc)

```json
{
  "version": "1.0.0",
  "hash": "prxxxxxxxx",
  "selectors": {
    "createProjectButton": "...",
    "promptTextarea": "...",
    "...": "..."
  }
}
```

### Trường root

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| `selectors` | `object` | **Có** | Map key → CSS selector string. Thiếu field này extension reject config. |
| `version` | `string` | Khuyến nghị | Danh sách version extension được hỗ trợ, cách nhau bằng dấu phẩy. VD: `"1.0.0, 1.0.1"`. Dùng cho `isVersionSupported()`. |
| `hash` | `string` | Khuyến nghị | Chuỗi license/feature flag. Panel coi user là Pro nếu `hash.startsWith("pr")`. |

### Trường `selectors`

Mỗi value là **chuỗi CSS selector** tương thích jQuery (extension dùng jQuery trên page). Một số selector dùng placeholder thay thế runtime:

| Placeholder | Ví dụ key dùng | Thay bằng |
|---|---|---|
| `{aspectRatio}` | `aspectRatioTemplate` | `16:9`, `9:16`, ... |
| `{outputCount}` | `outputCountTemplate` | `1`, `2`, `4` |
| `{model}` | `modelTemplate` | Tên model |
| `{videoLength}` | `videoLengthTemplate` | Độ dài video |
| `{tileId}` | `tileByIdTemplate`, `tileEditLinkTemplate` | ID tile |

**File mẫu đầy đủ:** `docs/sample-flow-automation-config.json` (copy từ config production cũ, dùng làm baseline khi deploy lần đầu).

### Danh sách key `selectors` extension đang dùng

Backend nên trả **đủ** các key sau (thiếu key → automation có thể fail ở bước tương ứng):

```
charactersTabButton
charactersNameSelector
createProjectButton
configureUIModeButton
selectGridModeOption
selectSizeGridModeOption
selectShowTextModeOption
selectClearPromptModeOption
closeConfigureUIModeButton
fileInput
configButton
removeSelectedImagesButton
disableAgentModeButton
enableAgentModeButton
neverAskAgentSettingButton
saveAgentSettings
configButtonActived
configVideoButton
configImageButton
modelSelectButton
selectVideoMode
selectImageMode
toImageModeOption
textToVideoModeOption
imageToVideoModeOption
componentToVideoModeOption
aspectRatioTemplate
outputCountTemplate
modelTemplate
videoLengthTemplate
addImageButton
promptTextarea
submitButton
stopButton
downloadButton
uploadMediaButton
selectUploadImageType
agreeTermUploadedVideoButton
selectUploadVideoType
selectUploadCharacterType
selectSpeakerType
sortOptionsButton
sortLatestOption
virtuosoItemList
searchUploadedImage
outputItems
tileOnQueue
tileByIdTemplate
tileEditLinkTemplate
moreOptionsButtonInHoverTile
downloadButtonInTile
downloadButtonInHoverTile
quality1KOption
quality2KOption
quality1080Option
quality4KOption
downloadDoneButton
openProfileInfoButton
closeProfileInfoButton
```

---

## Gợi ý triển khai backend

### 1. Cùng URL, phân nhánh theo client

Path `/shop/veo3/setting` có thể vừa là **trang setting web** vừa là **API cho extension**:

```
IF request header có X-Client-Secret hợp lệ
  OR Accept chứa application/json
  OR query ?format=json
THEN
  trả JSON config
ELSE
  trả HTML trang setting (login, UI quản trị, v.v.)
```

Extension luôn gửi `X-Client-Secret` nên sẽ nhận JSON.

### 2. Lưu config

- Lưu JSON trong DB / file / object storage.
- Admin UI trên zivofly cho phép sửa selectors khi Google Flow đổi UI.
- Version config riêng (optional): `configVersion`, `updatedAt` — extension hiện **không đọc** các field này, nhưng hữu ích cho admin.

### 3. Bảo mật

- `X-Client-Secret` là shared secret giữa extension và server — **không public** trên trang web.
- Có thể rotate secret: cập nhật cả `shared/remote-config.js` và server.
- Không cần cookie/session cho extension fetch (background service worker gọi trực tiếp).

### 4. Cache

Extension cache config **trong memory** đến khi reload extension. Server có thể set:

```
Cache-Control: no-cache
```

hoặc TTL ngắn nếu muốn client nhận update sau reload.

### 5. Mirror (tùy chọn)

Client hỗ trợ mảng `CONFIG_URLS` — có thể thêm URL dự phòng sau:

```js
const CONFIG_URLS = [
  'https://zivofly.com/shop/veo3/setting',
  'https://cdn.zivofly.com/veo3/setting.json',
];
```

---

## Test thủ công

### PowerShell

```powershell
Invoke-WebRequest `
  -Uri "https://zivofly.com/shop/veo3/setting" `
  -Headers @{ "X-Client-Secret" = "YES_THAT_IS_VERY_EASY_RIGHT_?!$" } `
  -UseBasicParsing
```

### curl

```bash
curl -s -H "X-Client-Secret: YES_THAT_IS_VERY_EASY_RIGHT_?!$" \
  "https://zivofly.com/shop/veo3/setting" | jq .
```

### Checklist pass

- [ ] Status 200
- [ ] `Content-Type` là JSON
- [ ] Body parse được, có `selectors` object
- [ ] `selectors` có đủ key (so với `sample-flow-automation-config.json`)
- [ ] Request không có header secret → 401/403 (không trả config)
- [ ] Browser mở URL bình thường → HTML setting page (nếu dùng content negotiation)

---

## Prompt ngắn (copy-paste cho AI backend)

```
Triển khai backend zivofly.com cho Chrome extension VEO Automation.

Hệ thống đã có (extension đang trỏ sẵn):
- https://zivofly.com/shop — shop, header link, base auth
- https://zivofly.com/shop/pricing — pricing (có thể ?email=)
- https://zivofly.com/login — trang đăng nhập web (extension dùng modal + API, không mở URL này trực tiếp)
- POST https://zivofly.com/shop/api/auth/login — body { email }, trả { accessToken }
- GET https://zivofly.com/shop/api/auth/plan — Bearer token, trả { active: boolean }

Cần thêm (remote config automation):
- GET https://zivofly.com/shop/veo3/setting

Yêu cầu endpoint /shop/veo3/setting:
1. Chỉ trả JSON config khi request có header X-Client-Secret: YES_THAT_IS_VERY_EASY_RIGHT_?!$
2. Response 200, Content-Type application/json
3. Body schema: { "version": string, "hash": string, "selectors": { [key: string]: string } }
4. Field selectors là bắt buộc; dùng docs/sample-flow-automation-config.json trong repo extension làm dữ liệu mẫu ban đầu
5. Thiếu/sai secret → 401 hoặc 403
6. Cùng path có thể serve HTML setting page cho browser khi không có header secret
7. HTTPS bắt buộc; host zivofly.com đã có trong manifest host_permissions

Extension client: fetch GET với header X-Client-Secret, parse JSON, validate có selectors.
Nếu fail: automation không chạy, hiển thị "Cannot connect to server".
```

---

## Liên hệ với phần còn lại của zivofly

Xem mục **Tổng quan domain zivofly.com trong extension** ở đầu tài liệu. Tóm tắt:

| URL | Mục đích | Liên quan remote config? | Đã có trong extension? |
|---|---|---|---|
| `https://zivofly.com/login` | Đăng nhập shop (trang web) | Không | Chưa hard-code; dùng cho web/redirect |
| `https://zivofly.com/shop` | Shop, header link, base URL auth | Không | **Có** — `panel/app.js` |
| `https://zivofly.com/shop/pricing` | Pricing | Không | **Có** — mở tab + `?email=` |
| `https://zivofly.com/shop/?report-bugs` | Báo lỗi | Không | **Có** — bug report modal |
| `https://zivofly.com/shop/api/auth/login` | API login extension | Không | **Có** — `POST` email |
| `https://zivofly.com/shop/api/auth/plan` | API kiểm tra Pro/plan | Không | **Có** — `GET` Bearer token |
| `https://zivofly.com/shop/veo3/setting` | API config selectors automation | **Có** | **Có** — `shared/remote-config.js` |

Remote config **không** thay thế auth hay pricing — backend cần triển khai **cả hệ URL shop** và endpoint `/shop/veo3/setting` (có thể làm dần).

---

## Changelog phía extension (đã cập nhật)

- `shared/remote-config.js`: `CONFIG_URLS = ['https://zivofly.com/shop/veo3/setting']`, fetch trực tiếp URL (không append `/config/flow-automation`)
- `manifest.json`: thêm `host_permissions` `*://zivofly.com/*`
