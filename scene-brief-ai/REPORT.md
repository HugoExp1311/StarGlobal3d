# REPORT - SceneBrief AI

## Mô tả chức năng đã làm

### Tính năng chính
- **Form nhập liệu**: Thu thập thông tin dự án 3D (tên, loại không gian, mô tả, khách hàng mục tiêu, ngôn ngữ, phong cách)
- **Tích hợp AI**: Sử dụng Gemini API để tạo nội dung marketing tự động
- **Mock AI Fallback**: Hệ thống dự phòng khi Gemini API không khả dụng
- **Hiển thị kết quả**: Các card chuyên nghiệp hiển thị tiêu đề, mô tả, điểm nổi bật, lưu ý số hóa 3D, và từ khóa SEO
- **Sample scenarios**: 3 mẫu dữ liệu nhanh (căn hộ, văn phòng, triển lãm)
- **JSON viewer**: Xem raw JSON response từ API
- **LocalStorage**: Lưu 5 kết quả gần nhất trong trình duyệt

### Kiến trúc kỹ thuật
- Next.js 15 App Router (frontend + backend trong một project)
- TypeScript với Zod validation
- Tailwind CSS cho UI responsive
- API route `/api/describe-scene` xử lý request/response
- Modular code structure (components, lib, types)

---

## Cách dùng AI/LLM

### AI Provider: Google Gemini API

**Model**: `gemini-1.5-flash` (free tier)

**Lý do chọn Gemini**:
- Miễn phí cho mục đích học tập
- Hỗ trợ tốt tiếng Việt và tiếng Anh
- Tốc độ nhanh, phù hợp real-time generation
- API đơn giản, dễ tích hợp

### Prompt Engineering Strategy

Prompt được xây dựng theo cấu trúc:
1. **System role**: Định nghĩa AI là marketing assistant cho công ty 3D digitization
2. **Context**: Cung cấp thông tin dự án (tên, loại, mô tả, khách hàng)
3. **Requirements**: Yêu cầu ngôn ngữ, tone, nội dung customer-facing
4. **Output format**: Yêu cầu strict JSON schema (không markdown, không code blocks)

**Kỹ thuật quan trọng**:
- Explicit JSON schema trong prompt
- Yêu cầu AI tránh technical jargon
- Adapt tone theo ngành (BDS, bán lẻ, triển lãm)
- Generate 3-5 highlights, 3 digitization notes, 5 SEO keywords

### Prompt mẫu 1: Căn hộ cao cấp (Tiếng Việt)

```
You are an AI assistant for a 3D digitization company specializing in creating virtual tours and digital spaces.

Generate marketing content for a 3D space project with the following details:
- Project Name: The Horizon Apartment
- Space Type: apartment
- Description: Căn hộ cao cấp 2 phòng ngủ, thiết kế hiện đại
- Target Customers: Gia đình trẻ, nhà đầu tư

Requirements:
- Output language: Vietnamese
- Tone: professional and trustworthy
- Content must be customer-facing and marketing-focused
- Avoid unsupported claims or overly technical jargon

You MUST return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "title": "A compelling project title for the introduction page",
  "shortDescription": "A 2-3 sentence engaging description for customers in Vietnamese",
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4", "Highlight 5"],
  "digitizationNotes": ["Important consideration 1 for 3D digitization", "Important consideration 2 for 3D digitization", "Important consideration 3 for 3D digitization"],
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
```

### Prompt mẫu 2: Văn phòng sáng tạo (Tiếng Anh)

```
You are an AI assistant for a 3D digitization company specializing in creating virtual tours and digital spaces.

Generate marketing content for a 3D space project with the following details:
- Project Name: Nova Creative Office
- Space Type: office
- Description: Open workspace for creative teams
- Target Customers: Startups, tech companies

Requirements:
- Output language: English
- Tone: energetic and modern
- Content must be customer-facing and marketing-focused
- Avoid unsupported claims or overly technical jargon

You MUST return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "title": "A compelling project title for the introduction page",
  "shortDescription": "A 2-3 sentence engaging description for customers in English",
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4", "Highlight 5"],
  "digitizationNotes": ["Important consideration 1 for 3D digitization", "Important consideration 2 for 3D digitization", "Important consideration 3 for 3D digitization"],
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
```

### Cách kiểm tra output của AI

**1. JSON Parsing Validation**
```typescript
// Clean markdown code blocks nếu có
let cleanedText = text.trim();
if (cleanedText.startsWith('```json')) {
  cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
}

// Parse JSON
const parsed = JSON.parse(cleanedText);
```

**2. Structure Validation**
```typescript
// Kiểm tra các field bắt buộc
if (!parsed.title || !parsed.shortDescription || !Array.isArray(parsed.highlights)) {
  throw new Error('Invalid response structure from Gemini');
}
```

**3. Content Quality Check (Manual)**
- Kiểm tra tone có phù hợp không (professional/dynamic/impressive)
- Kiểm tra ngôn ngữ đúng (Vietnamese/English)
- Kiểm tra nội dung có customer-facing không (không quá technical)
- Kiểm tra từ khóa SEO có liên quan không

**4. Fallback Strategy**
Nếu Gemini fail hoặc response invalid → tự động chuyển sang mock AI:
```typescript
try {
  const data = await generateWithGemini(request);
  response = { success: true, source: 'gemini', data };
} catch (error) {
  const data = generateMockScene(request);
  response = { 
    success: true, 
    source: 'mock', 
    notice: 'Gemini không khả dụng, đã sử dụng mock fallback',
    data 
  };
}
```

---

## Khó khăn gặp phải

### 1. JSON Output từ Gemini không ổn định
**Vấn đề**: Gemini đôi khi trả về JSON wrapped trong markdown code blocks (```json ... ```)

**Giải pháp**: Thêm logic clean markdown trước khi parse:
```typescript
if (cleanedText.startsWith('```json')) {
  cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
}
```

### 2. Validation phức tạp cho custom space type
**Vấn đề**: User chọn "Khác" thì phải nhập custom space type, nhưng validation phải conditional

**Giải pháp**: Validation trong form component:
```typescript
if (formData.spaceType === 'other' && !formData.customSpaceType?.trim()) {
  newErrors.customSpaceType = 'Vui lòng nhập loại không gian tùy chỉnh';
}
```

### 3. Sample scenario không trigger form validation
**Vấn đề**: Khi click sample button, cần bypass validation và auto-submit

**Giải pháp**: Re-mount form component với key prop:
```typescript
const [formKey, setFormKey] = useState(0);
const handleSampleSelect = (data: SceneRequest) => {
  setFormKey(prev => prev + 1); // Force re-mount
  setTimeout(() => handleSubmit(data), 100);
};
```

---

## 3 lỗi/điểm chưa hợp lý đã quan sát

### 1. Không có history panel cho localStorage
**Mức độ ảnh hưởng**: Trung bình

**Mô tả**: App đã lưu recent results vào localStorage nhưng không có UI để xem lại lịch sử.

**Cải thiện**:
- Thêm "Recent Results" panel ở cuối trang
- Hiển thị 5 kết quả gần nhất với timestamp
- Cho phép click vào để xem lại kết quả cũ
- Nút "Clear History" để xóa localStorage

### 2. Không có copy-to-clipboard cho kết quả
**Mức độ ảnh hưởng**: Thấp

**Mô tả**: User phải manually select và copy text từ các card. Không tiện khi muốn copy toàn bộ hoặc từng phần.

**Cải thiện**:
- Thêm nút "Copy" cho mỗi section (title, description, highlights)
- Nút "Copy All as Markdown" để copy toàn bộ kết quả
- Toast notification khi copy thành công

### 3. Form không giữ state khi generate lỗi
**Mức độ ảnh hưởng**: Trung bình

**Mô tả**: Nếu API fail hoàn toàn (không fallback), user phải nhập lại toàn bộ form.

**Cải thiện**:
- Giữ form data sau khi submit fail
- Hiển thị error inline thay vì xóa form
- Nút "Retry" để submit lại với cùng data

---

## Hướng cải thiện nếu có thêm thời gian

### Tính năng bổ sung

**1. Multi-language UI**
- Cho phép switch toàn bộ UI sang tiếng Anh
- Lưu preference vào localStorage

**2. Export functionality**
- Export kết quả ra PDF
- Export ra Word document
- Export ra JSON file

**3. Comparison mode**
- So sánh 2-3 kết quả generate khác nhau
- Chọn phần tốt nhất từ mỗi kết quả

**4. Advanced prompt customization**
- Cho phép user chỉnh prompt template
- Thêm custom instructions
- Save custom prompts

**5. Batch processing**
- Upload CSV với nhiều dự án
- Generate hàng loạt
- Download results as ZIP

### Cải tiến kỹ thuật

**1. Server-side caching**
- Cache Gemini responses với same input
- Giảm cost và tăng tốc độ

**2. Rate limiting**
- Limit số request per minute
- Tránh spam API

**3. Analytics**
- Track usage metrics (số lượng generate, success rate)
- Track most popular space types
- Track AI source distribution (Gemini vs mock)

**4. Better error messages**
- Chi tiết hơn về lỗi (quota exceeded, network error, invalid key)
- Gợi ý cách fix cho từng loại lỗi

**5. Database integration**
- Lưu kết quả vào database thay vì localStorage
- User authentication
- Share results với team members

### UI/UX improvements

**1. Dark mode**
- Toggle dark/light theme
- Lưu preference

**2. Mobile optimization**
- Cải thiện UX trên mobile
- Bottom sheet cho results
- Swipe gestures

**3. Loading progress**
- Hiển thị progress bar thay vì spinner
- Show estimated time
- Streaming response từ API

**4. Accessibility**
- Improve keyboard navigation
- Add ARIA labels
- Screen reader support

**5. Onboarding**
- Tutorial cho first-time users
- Interactive guide
- Video demo

---

## Kết luận

Project hoàn thành đầy đủ các yêu cầu bài test:
- ✅ Frontend nhập liệu
- ✅ Backend API
- ✅ AI integration (Gemini + mock fallback)
- ✅ Validation và error handling
- ✅ Loading states
- ✅ README chi tiết
- ✅ Code chạy local được

Điểm mạnh:
- Architecture modular, dễ mở rộng
- Hybrid AI strategy đảm bảo app luôn hoạt động
- Professional UI với Tailwind CSS
- TypeScript + Zod cho type safety

Có thể cải thiện thêm về localStorage history UI, export functionality, và advanced features nếu có thêm thời gian phát triển.
