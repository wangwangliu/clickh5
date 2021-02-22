---
category: Components
type: Feedback
title: Toast
subtitle: 轻提示
---

一种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。

### 规则
- 一次只显示一个 toast。

## API

- `Toast.info({content, duration, onClose, mask})`

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| content    | 提示内容       | React.Element(可自定义样式) or String    |            |
| duration   | 自动关闭的延时，单位秒 | number                 | 2          |
| onClose    | 关闭后回调 |  Function                 |           |
| mask    | 是否显示透明蒙层，防止触摸穿透 |  Boolean  | true          |

> **注：**  duration = 0 时，onClose 无效，toast 不会消失；隐藏 toast 需要手动调用 hide

还提供了全局销毁方法：
- `Toast.hide()`
