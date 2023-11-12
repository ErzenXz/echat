
function showFileUploadPopup() {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.classList.add('file-input');

    // Close button

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popupContainer);
    });
    popupContainer.appendChild(closeButton);


    const progressBar = document.createElement('progress');
    progressBar.classList.add('progress-bar');
    progressBar.classList.add('hidden');
    progressBar.value = 0;
    progressBar.max = 100;
    progressBar.id = 'progressBar';

    // Size text

    const sizeText = document.createElement('p');
    sizeText.textContent = 'File size: ';
    sizeText.classList.add('size-text');

    // uploaded vs total

    const uploadedText = document.createElement('p');
    uploadedText.textContent = 'Uploaded: ';
    uploadedText.classList.add('uploaded-text');



    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Upload';
    uploadButton.classList.add('upload-button');

    popupContainer.appendChild(fileInput);
    popupContainer.appendChild(sizeText);
    popupContainer.appendChild(progressBar);
    popupContainer.appendChild(uploadedText);
    popupContainer.appendChild(uploadButton);
    document.body.appendChild(popupContainer);

    uploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];

        if (file) {

            sizeText.textContent = `File size: ${formatBytes(file.size)}`;

            const formData = new FormData();
            formData.append('file', file);

            const xhr = new XMLHttpRequest();
            document.getElementById("progressBar").classList.remove("hidden");

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentage = (event.loaded / event.total) * 100;
                    progressBar.value = percentage;
                    uploadedText.textContent = `Uploaded: ${formatBytes(event.loaded)}/${formatBytes(event.total)}`;
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    toast("File uploaded successfully!");
                    document.getElementById("message").value = response.link;
                    sendMessage();
                    closePopup();
                } else {
                    console.error('Upload failed. Status:', xhr.status);
                    toast("File upload failed!");
                    closePopup();
                }
            });

            xhr.addEventListener('error', () => {
                console.error('Upload failed. An error occurred.');
                toast("File upload failed!");
                closePopup();
            });

            xhr.open('POST', 'https://file.io/?expires=1d', true);
            xhr.send(formData);
        } else {
            console.error('No file selected.');
            toast("No file selected!");
            closePopup();
        }
    });

    function closePopup() {
        document.body.removeChild(popupContainer);
    }
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
