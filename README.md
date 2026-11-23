# Neo · 数学桥梁

首批六个静态入门单元：量纲与比例、导数与近似、积分与累积、向量与矩阵、微分方程、误差传播。每个单元有先修、物理例子、适用条件、可展开的练习答案与独立任务。无需 JavaScript 或依赖安装。

本地运行：`python3 -m http.server 8080`，访问根目录。部署到 GitHub Pages 的 main 根目录即可。

`methods.html` 新增六个数学物理方法单元：Fourier 与采样、概率统计、偏微分方程、数值计算、张量、群论。内容包括先修路线、公式条件、物理例子、推导与练习；正文不依赖脚本。

计算练习用浏览器 ES 模块运行：一维常扩散率、均匀网格的显式热方程稳定性检查，以及 y′ = −y 在固定终点的 Euler 收敛表。它们仅作教学计算，不保存或上传输入。请通过 HTTP 访问；禁用 JavaScript 时有静态示例与公式可读。

这不是完整数学课程，尚未覆盖一般 PDE 理论、有限元、完整张量分析与群表示分类。链接到主站、Equimophysics、Ultra 和 Pro Max。当前不存储学习记录。

验证：`node --test tests/math.test.mjs`；`python3 tests/browser.py`（Python Playwright 与 `/usr/bin/chromium`，当前云环境已具备）。检查数值比例与边界、浏览器交互、章节锚点、响应式及无脚本阅读。
