# 性能优化指南

## ✅ 已实现的优化

### 1. **Three.js 场景优化** (Scene.tsx)
- ✅ 几何体分段数从 64x64 降低到 32x32（顶点数减少 75%）
- ✅ 星星粒子数从 2000 降低到 1000（减少 50%）
- ✅ `meshPhysicalMaterial` 改为 `meshStandardMaterial`（性能提升 ~20%）
- ✅ MouseParallax 改为每 2 帧更新一次（减少计算 50%）

**预期效果**: 帧率提升 40-50%, 首屏渲染快 20-30%

---

### 2. **ProjectGrid 组件优化** (ProjectGrid.tsx)
- ✅ ProjectCard 用 `memo` 包装，避免不必要的重新渲染
- ✅ `getBoundingClientRect()` 缓存优化：
  - 仅在 `onMouseEnter` 时调用一次
  - 减少回流 (reflow) 导致的性能下降
- ✅ 添加 `decoding="async"` 到图片标签，非阻塞式解码

**预期效果**: 鼠标交互响应快 30-40%, 避免 jank

---

### 3. **Navbar 滚动优化** (Navbar.tsx)
- ✅ 使用 `requestAnimationFrame` throttle 滚动事件
- ✅ DOM 节点引用缓存，避免重复 `document.getElementById()` 查询
- ✅ 查找到第一个匹配的 section 后立即退出循环

**预期效果**: 滚动性能提升 20-30%, CPU 占用降低

---

### 4. **动画性能优化** (AnimatedSection.tsx)
- ✅ Spring 动画参数优化：damping 20→25, stiffness 100→80
- ✅ 减少动画计算频率和帧数

**预期效果**: 动画更流畅，CPU 占用降低 15-20%

---

### 5. **图片加载优化** (Hero.tsx, index.astro)
- ✅ 添加 `decoding="async"` 到所有 `<img>` 标签
- ✅ Hero 头像添加 `loading="eager"`（优先级加载）

**预期效果**: FCP (First Contentful Paint) 提升 10-15%

---

## 📋 下一步优化建议（可选）

### 图片格式转换（可选但推荐）
虽然 UI 保持不变，但可以进一步优化：

```bash
# 使用 ImageMagick 或 Sharp 将 PNG 转换为 WebP
convert /images/avatar.png -quality 85 /images/avatar.webp
convert /images/project_cover_tech.png -quality 80 /images/project_cover_tech.webp

# 或使用 cwebp
cwebp -q 85 /images/avatar.png -o /images/avatar.webp
```

然后在 HTML/JSX 中使用 `<picture>` 元素：

```tsx
<picture>
  <source srcSet="/images/avatar.webp" type="image/webp" />
  <img src="/images/avatar.png" alt="Avatar" />
</picture>
```

**预期节省**: 40-60% 图片大小（115KB → 50KB 左右）

---

### Astro 原生图片优化
使用 Astro 的 `<Image>` 组件自动处理：

```astro
---
import { Image } from 'astro:assets';
import avatarImg from '../assets/avatar.png';
---

<Image src={avatarImg} alt="Avatar" />
```

---

## 📊 预期性能提升

| 指标 | 提升幅度 | 优先级 |
|------|---------|-------|
| 帧率 (FPS) | ⬆️ 40-50% | 🔴 高 |
| 鼠标交互响应 | ⬆️ 30-40% | 🔴 高 |
| 滚动性能 | ⬆️ 20-30% | 🟡 中 |
| FCP | ⬆️ 10-15% | 🟡 中 |
| CPU 占用 | ⬇️ 20-30% | 🟡 中 |

---

## 🔍 测试性能优化

### 使用 Chrome DevTools

1. **打开 Performance 面板**
   - Ctrl/Cmd + Shift + P → "Show Performance"
   - 录制页面加载和交互

2. **查看关键指标**
   - FCP (First Contentful Paint)
   - LCP (Largest Contentful Paint)
   - CLS (Cumulative Layout Shift)
   - 帧率 (FPS)

3. **鼠标交互测试**
   - 在 ProjectCard 上悬停，检查是否有卡顿

### 使用 Lighthouse

```bash
npm install -g @lhci/cli@latest
lighthouse --view https://your-site.com
```

---

## 💡 优化原理解析

### Three.js 顶点缓冲
- **问题**: 64x64 = 4096 顶点，每帧都更新所有坐标
- **解决**: 32x32 = 1024 顶点，减少 GPU 传输数据

### DOM 回流 (Reflow)
- **问题**: `getBoundingClientRect()` 每次鼠标移动都调用，触发回流
- **解决**: 缓存 DOM rect，仅在需要时更新

### 事件节流 (Throttle)
- **问题**: 滚动事件每秒触发 60+ 次，每次都查询 DOM
- **解决**: 使用 RAF 限制频率，缓存 DOM 引用

---

## 🚀 部署检查清单

- [ ] 本地测试所有优化功能是否正常
- [ ] 检查浏览器兼容性（async decoding, RAF）
- [ ] 测试移动端性能
- [ ] 跑一遍 Lighthouse 审计
- [ ] 对比优化前后的 Performance 录制

