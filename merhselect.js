import '../public/css/merhselect.css'
export default class merhSelect {
    constructor({
        selectorID = 'id',
        placeholder = false,
        options = [],
        multiple = false,
        autoClose = false,
        firstOptionReset = false,
    }) {
        this.firstOptionReset = firstOptionReset
        this.autoClose = autoClose
        this.multiple = multiple
        this.selectorID = selectorID
        this.selection = []
        this.options = options
        this.placeholder = placeholder
        this.selected_option = ''
        const option_identifier = []
        const selector = document.getElementById(selectorID)
        const ms_id = 'ms-' + random()
        window.exportSelection = ""

        //create visible main
        this.createMain = function () {
            //set up visible: main
            selector.classList.add('hidden')
            const main = document.createElement('div')
            main.setAttribute('id', ms_id)
            main.classList.add('ms_main')
            const select = document.createElement('div')
            select.classList.add('ms_select')

            if (!this.placeholder) {
                select.appendChild(document.createTextNode(this.options[0][0]))
            } else {
                select.appendChild(document.createTextNode(placeholder))
            }

            select.insertAdjacentElement('afterend', select)

            //set up visible: select-option
            const container = document.createElement('div')
            container.classList.add('ms_container')
            container.classList.add('hidden')

            const list = document.createElement('div')
            list.classList.add('ms_list')

            options.forEach(option => {
                const id = 'ms_op-' + random()
                let string = option[0]
                let img = ''
                if (option[2] !== undefined) {
                    img = `<img src="` + option[2] + `">`
                }

                option_identifier.push([string, id])
                const html = `<div class="ms_option" data-value="` + option[1] + `" id="` + id + `">` + img + string + `</div>`
                list.insertAdjacentHTML('beforeend', html)
            });
            container.appendChild(list)
            main.insertAdjacentElement('afterbegin', select)
            main.insertAdjacentElement('beforeend', container)
            selector.insertAdjacentElement('afterend', main)



        }
        this.createMain()

        this.eventListener = function () {
            const main = document.getElementById(ms_id);
            const select = main.querySelector('.ms_select')
            const list = main.querySelector('.ms_list')
            const container = main.querySelector('.ms_container')
            const mainselect = document.getElementById(selectorID)

            //open dropdown menu
            main.addEventListener('click', function (e) {
                if (select !== e.target) return;
                container.classList.toggle('hidden')
            });

            //close dropdown menu when click outside
            document.addEventListener('click', function (e) {
                if (select == e.target) return;

                if (main.classList.contains('hidden')) return;
                if (e.target.closest('.ms_container')) return;

                container.classList.add('hidden')
            });

            //set select value
            if (this.multiple) {
                list.addEventListener('click', function (e) {

                    let selection = []
                    const selected_option = e.target

                    if (selected_option.classList.contains('multi-selected')) {
                        selected_option.classList.remove('multi-selected')
                    } else {
                        selected_option.classList.add('multi-selected')
                    }

                    const arr = list.querySelectorAll('.multi-selected')
                    arr.forEach(item => {
                        const selected_data = item.getAttribute('data-value')
                        const selected_value = item.textContent
                        selection.push([selected_value, selected_data])
                    });


                    if (firstOptionReset) {
                        const firstOption_value = list.childNodes[0].textContent
                        const firstOption_data = list.childNodes[0].getAttribute('data-value')

                        const firstOptionSelection = []
                        selection.forEach(item => {
                            firstOptionSelection.push(item[1])
                        });


                        if (firstOptionSelection.includes(firstOption_data)) {
                            selection = [[firstOption_value, firstOption_data]]

                            document.querySelectorAll('.multi-selected').forEach(div => {
                                div.classList.remove('multi-selected')
                                container.classList.add('hidden')
                            })
                        }

                        if (selection.length > 1) {
                            select.innerHTML = 'Multiple selected...'
                        } else if (selection.length == 0) {
                            select.innerHTML = firstOption_value
                        } else {
                            select.innerHTML = selection[0][0]
                        }
                    }

                    if (autoClose) {
                        container.classList.add('hidden')
                    }

                    const result = []
                    selection.forEach(item => {
                        result.push(item[1])
                    })

                    window.exportSelection = result
                    mainselect.dispatchEvent(new Event('updated'))
                });


            } else {
                list.addEventListener('click', function (e) {
                    const selected_data = e.target.getAttribute('data-value')
                    const selected_value = e.target.textContent
                    select.innerHTML = selected_value;
                    container.classList.add('hidden')
                    window.exportSelection = [selected_data]
                    mainselect.dispatchEvent(new Event('updated'))
                });
            }
        }
        this.eventListener()
    }

    selected() {
        return exportSelection
    }

    set(string) {
        document.querySelectorAll('.ms_option').forEach(ele => {
            if (ele.textContent.toLowerCase() == string) {
                ele.click()
            }
        })
    }
}

function random() {
    return String(Math.floor(Math.random() * 100000000))
}