// Lấy tất cả các nút createDiv
document.querySelectorAll('.createDiv').forEach(button => {
    button.addEventListener('click', function() {
        // Tìm phần tử input gần nhất với button này
        const userInput = this.previousElementSibling.value;

        // Kiểm tra nếu không có nội dung
        if (userInput.trim() === "") {
            alert("Please enter some text!");
            return;
        }

        // Tạo div mới
        const newDiv = document.createElement('div');
        newDiv.classList.add('new-div');
        newDiv.textContent = userInput;
        newDiv.setAttribute('draggable', 'true');
        // Thêm div mới vào sau input
        this.parentElement.appendChild(newDiv);
        // Xóa nội dung trong input
        this.previousElementSibling.value = '';
        newDiv.style.left = '0px';
        newDiv.style.top = '0px';
        // Thêm sự kiện mousedown cho newDiv
        newDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', newDiv.textContent);
            event.dataTransfer.effectAllowed = 'move';
        });
        
        newDiv.onmousedown = function(event) {
            // Thiết lập z-index để kéo lên trên
            let shiftX = event.clientX - newDiv.getBoundingClientRect().left;
            let shiftY = event.clientY - newDiv.getBoundingClientRect().top;
            newDiv.style.position = 'absolute';
            newDiv.style.zIndex = 1000;

            // Hàm để di chuyển newDiv theo chuột
            function moveAt(pageX, pageY) {
                newDiv.style.left = pageX - shiftX + 'px';
                newDiv.style.top = pageY - shiftY + 'px';
            }

            // Di chuyển newDiv đến vị trí chuột hiện tại
            moveAt(event.pageX, event.pageY);

            // Di chuyển newDiv theo chuột
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // Thêm sự kiện lắng nghe cho di chuyển chuột
            document.addEventListener('mousemove', onMouseMove);

            // Khi nhả chuột, ngừng di chuyển
            newDiv.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                newDiv.onmouseup = null; // Hủy bỏ sự kiện onmouseue
                event.target
            };

            // Ngăn chặn hành vi mặc định của trình duyệt
            return false; // Để ngăn chặn chọn văn bản
        };
    });
});