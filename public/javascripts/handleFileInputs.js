const frontInput = document.querySelector('#frontObciansky');
const frontContainer = document.querySelector('.front-container');
const frontImage = document.querySelector('.front-img')

const backInput = document.querySelector('#backObciansky');
const backContainer = document.querySelector('.back-container');
const backImage = document.querySelector('.back-img')

const dokladyInput = document.querySelector('#doklady')
const dokladyContainer = document.querySelector('.doklady-container')
const dokladyImage = document.querySelector('.doklady-img')

const additionalInputContainer = document.querySelector('.additional-input-container')
const additionalInput = document.querySelector('.additional-input')

const count = document.querySelector('.count');

const inputForm = document.querySelector('#input-form')

const removeFileFromFileList = (fileInput, index) => {
    const dt = new DataTransfer()
    const {files} = fileInput

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (index !== i)
            dt.items.add(file) // here you exclude the file. thus removing it.
    }

    fileInput.files = dt.files // Assign the updates list
}

let handleFileInput = (fileInput, container, image) => {
    const containerChild = container.firstElementChild;
    const imgContainer = container.querySelector('.img-container');
    let dropArea = container.firstElementChild;
    // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
        document.body.addEventListener(eventName, preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })
    dropArea.addEventListener('drop', handleDrop, false)

    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    function highlight(e) {
        dropArea.classList.add('highlight')
    }
    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }
    function handleDrop(e) {
        var dt = e.dataTransfer
        var files = dt.files

        handleFiles(files)
    }
    function handleFiles(files) {
        files = [...files]
        console.log(files)
        imgContainer.classList.add('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
        image.src = URL.createObjectURL(files[0]);
        image.classList.toggle('hidden');
        containerChild.classList.add('hidden')
        const icons = container.querySelectorAll('.trash')
        for (const icon of icons) {
            icon.classList.remove('hidden')
            icon.addEventListener('click', () => {
                imgContainer.classList.remove('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
                removeFileFromFileList(fileInput, 0)
                image.src = '';
                image.classList.add('hidden')
                containerChild.classList.remove('hidden')
                icon.classList.add('hidden')
            })
        }
    }


    fileInput.onchange = () => {
        const [file] = fileInput.files;
        if (file) {
            if (file.size < 5_000_000) {
                // w-[160px] h-[90px]  border-2 border-secondary
                imgContainer.classList.add('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
                image.src = URL.createObjectURL(file);
                image.classList.toggle('hidden');
                containerChild.classList.add('hidden')
                const icons = container.querySelectorAll('.trash')
                for (const icon of icons) {
                    icon.classList.remove('hidden')
                    icon.addEventListener('click', () => {
                        imgContainer.classList.remove('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
                        removeFileFromFileList(fileInput, 0)
                        image.src = '';
                        image.classList.add('hidden')
                        containerChild.classList.remove('hidden')
                        icon.classList.add('hidden')
                    })
                }
            }
        }
    }
}

let handleMultipleInput = (fileInput, container, image, additionalInput, additionalContainer) => {
    let files = fileInput.files;
    let filesArray = []

    fileInput.addEventListener('change', () => {
        if (files) {
            filesArray = Array.from(files)
            if (filesArray.length <= 3) {
                console.log(filesArray)
                if (filesArray.length < 3) {
                    additionalContainer.classList.add('order-2')
                    additionalContainer.classList.remove('hidden')
                }
                console.log('success')
                const containerChild = container.firstElementChild;
                const imgContainer = container.querySelector('.img-container');
                imgContainer.classList.remove('hidden')
                imgContainer.classList.add('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
                image.src = URL.createObjectURL(files[files.length - 1]);
                image.classList.toggle('hidden');
                containerChild.classList.add('hidden')
                const icons = container.querySelectorAll('.trash')
                for (const icon of icons) {
                    icon.classList.remove('hidden')
                    icon.addEventListener('click', () => {
                        imgContainer.classList.remove('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
                        image.src = '';
                        image.classList.add('hidden')
                        imgContainer.classList.add('hidden')
                        additionalContainer.classList.add('hidden')
                        containerChild.classList.remove('hidden')
                        icon.classList.add('hidden')
                        fileInput.value = '';
                        filesArray = []
                        console.log(filesArray)
                        count.innerText = '0'
                    })
                }
            }
            count.innerText = filesArray.length
        }
    })

    additionalInput.addEventListener('change', () => {
        const [additionalFile] = additionalInput.files
        if (additionalFile) {
            filesArray.push(additionalFile)
            if (filesArray.length === 3) {
                additionalContainer.classList.add('hidden')
            }
        }
        count.innerText = filesArray.length
    })

}

if (inputForm) {
    inputForm.addEventListener('submit', (e) => {
        console.log(count.innerText)
        if (count.innerText !== '3') {
            e.preventDefault()
        }
    })
}

if (frontInput) {
    handleFileInput(frontInput, frontContainer, frontImage)
    handleFileInput(backInput, backContainer, backImage)
    handleMultipleInput(dokladyInput, dokladyContainer, dokladyImage, additionalInput, additionalInputContainer)
}
