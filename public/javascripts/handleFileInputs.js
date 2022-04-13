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

const setupDropAreaEnv = (container, handleFiles) => {
    let dropArea = container.firstElementChild;

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

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function highlight() {
        dropArea.classList.add('highlight')
    }

    function unhighlight() {
        dropArea.classList.remove('highlight')
    }

    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files

        handleFiles(files)
    }
}

const setupSingleInputContainer = (container, image, file, fileInput) => {
    const imgContainer = container.querySelector('.img-container');
    const containerChild = container.firstElementChild;
    const icons = container.querySelectorAll('.trash')

    imgContainer.classList.add('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')

    image.src = URL.createObjectURL(file);
    image.classList.toggle('hidden');

    containerChild.classList.add('hidden')

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

let handleFileInput = (fileInput, container, image) => {
    // Setup drag and drop functions
    setupDropAreaEnv(container, handleFiles)
    //drag and drop file handling function
    function handleFiles(files) {
        files = [...files]

        setupSingleInputContainer(container, image, files[0], fileInput)
    }

    fileInput.onchange = () => {
        const [file] = fileInput.files;
        if (file) {
            if (file.size < 5_000_000) {
                setupSingleInputContainer(container, image, file, fileInput)
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

//form validation
if (inputForm) {
    inputForm.addEventListener('submit', (e) => {
        let [file1] = frontInput.files;
        let [file2] = backInput.files;

        if (count.innerText !== '3' || !file1 || !file2) {
            e.preventDefault()
        }
    })
}

//making sure the script is triggered on /step-4
if (frontInput) {
    handleFileInput(frontInput, frontContainer, frontImage)
    handleFileInput(backInput, backContainer, backImage)
    handleMultipleInput(dokladyInput, dokladyContainer, dokladyImage, additionalInput, additionalInputContainer)
}
