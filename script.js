document.addEventListener('DOMContentLoaded', () => {
    const waterfallContainer = document.getElementById('waterfall-container');
    let items = []; // Will be populated dynamically

    function waterfallLayout() {
        items = Array.from(waterfallContainer.getElementsByClassName('waterfall-item'));
        if (items.length === 0) return;

        const containerWidth = waterfallContainer.offsetWidth;
        const itemStyle = getComputedStyle(items[0]);
        const itemMarginLeft = parseFloat(itemStyle.marginLeft);
        const itemMarginRight = parseFloat(itemStyle.marginRight);
        const itemMarginTop = parseFloat(itemStyle.marginTop);
        const itemMarginBottom = parseFloat(itemStyle.marginBottom);

        const itemWidth = items[0].offsetWidth + itemMarginLeft + itemMarginRight; // Item width including horizontal margins
        const columnCount = Math.floor(containerWidth / itemWidth);
        
        // Ensure at least one column
        const actualColumnCount = Math.max(1, columnCount);

        const columnHeights = Array(actualColumnCount).fill(0); // Initialize all column heights to 0

        items.forEach(item => {
            const minHeight = Math.min(...columnHeights);
            const minIndex = columnHeights.indexOf(minHeight);

            item.style.position = 'absolute';
            item.style.left = `${minIndex * itemWidth}px`;
            item.style.top = `${minHeight}px`;

            // Update column height with item's full height including vertical margins
            columnHeights[minIndex] += item.offsetHeight + itemMarginTop + itemMarginBottom;
        });

        waterfallContainer.style.height = `${Math.max(...columnHeights)}px`;
    }

    // Function to add dummy items for initial demonstration
    function addDummyItems() {
        const dummyData = [
            { img: 'https://via.placeholder.com/200x300?text=Image+1', title: '博客文章 1', desc: '这是一篇关于前端开发的博客文章。' },
            { img: 'https://via.placeholder.com/200x250?text=Image+2', title: '博客文章 2', desc: '探索CSS新特性。' },
            { img: 'https://via.placeholder.com/200x350?text=Image+3', title: '博客文章 3', desc: 'JavaScript异步编程。' },
            { img: 'https://via.placeholder.com/200x200?text=Image+4', title: '博客文章 4', desc: '响应式设计实践。' },
            { img: 'https://via.placeholder.com/200x280?text=Image+5', title: '博客文章 5', desc: 'Web性能优化技巧。' },
            { img: 'https://via.placeholder.com/200x320?text=Image+6', title: '博客文章 6', desc: 'Vue.js组件化开发。' },
            { img: 'https://via.placeholder.com/200x270?text=Image+7', title: '博客文章 7', desc: 'React Hooks深入理解。' },
            { img: 'https://via.placeholder.com/200x310?text=Image+8', title: '博客文章 8', desc: 'Node.js后端开发。' },
            { img: 'https://via.placeholder.com/200x240?text=Image+9', title: '博客文章 9', desc: '数据库设计与优化。' },
            { img: 'https://via.placeholder.com/200x330?text=Image+10', title: '博客文章 10', desc: 'Docker容器化部署。' }
        ];

        dummyData.forEach(data => {
            const item = document.createElement('div');
            item.className = 'waterfall-item';
            item.innerHTML = `
                <img src="${data.img}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.desc}</p>
            `;
            waterfallContainer.appendChild(item);
        });
        // Re-layout after adding dummy items, ensuring images are loaded
        const images = waterfallContainer.querySelectorAll('.waterfall-item img');
        let imagesLoaded = 0;
        images.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.onload = () => {
                    imagesLoaded++;
                    if (imagesLoaded === images.length) {
                        waterfallLayout();
                    }
                };
                img.onerror = () => {
                    imagesLoaded++; // Still count as loaded even if error
                    if (imagesLoaded === images.length) {
                        waterfallLayout();
                    }
                };
            }
        });
        if (imagesLoaded === images.length) { // All images were already complete
            waterfallLayout();
        }
    }

    addDummyItems(); // Call to add dummy items and trigger initial layout
});