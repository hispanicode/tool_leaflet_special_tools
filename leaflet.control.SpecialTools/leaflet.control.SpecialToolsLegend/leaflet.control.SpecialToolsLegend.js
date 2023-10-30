
L.Control.SpecialToolsLegend = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;

        const component_geolocation = special_tools.options.component_geolocation;

        const controlDiv = L.DomUtil.create('div', 'special-tools-legend special-tools-controls special-tools-disable');

        tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Leyenda', 
            lang: lang

        });

        this.legend_div_container = L.DomUtil.create('div', 'special-tools-container-legend-div');
        
        this.legend_div = L.DomUtil.create('div', 'special-tools-legend-div');

        this.legend_div.style.left = ((map.getSize().x / 2) + 100) + "px";
        
        map.on('resize', function(e){
            
            self.legend_div.style.left = ((e.newSize.x / 2) + 100) + "px";
            
        });

        map._controlCorners.topleft.appendChild(this.legend_div);

        if (!L.Browser.mobile) {
            
            special_tools.special_tools_btns.appendChild(controlDiv);
            
        } else {
            
            this.legend_div.style.display = 'none';
            
        }
        
        var legend_json;

        let options = {};
        
        let promise = tool.legends(options);

        promise.then(function(data){ 
            
            legend_json = JSON.parse(data.content);
            
            if (legend_json.hasOwnProperty('enable')) {
                
                if (legend_json.enable) {
                    
                    self.legend_div.style.display = 'block';
                    
                } else {
                    
                    self.legend_div.style.display = 'none';
                    
                }
                
            }
            
            self.legend_div.innerHTML = '';

            const legend_title = L.DomUtil.create('div');
            legend_title.setAttribute('class', 'special-tools-legend-name');
            legend_title.innerText = legend_json.legend;

            self.legend_div.appendChild(legend_title);

            for (let col in legend_json.columns) {

                const column_div = L.DomUtil.create('div');

                column_div.setAttribute('class', 'special-tools-column-div');

                const column_name = L.DomUtil.create('div');
                column_name.setAttribute('class', 'special-tools-container special-tools-column-name');
                column_name.innerText = legend_json.columns[col].name;

                column_div.appendChild(column_name);

                self.legend_div.appendChild(column_div);

                for (let elem in legend_json.columns[col].elements) {

                    const element_div = L.DomUtil.create('div');

                    const element_color = L.DomUtil.create('div');
                    element_color.style.backgroundColor = legend_json.columns[col].elements[elem].color;
                    element_color.style.width = '8px';
                    element_color.style.height = '8px';
                    element_color.style.marginTop = '3px';
                    element_color.style.marginRight = '4px';
                    element_color.style.float = 'left';

                    const element_name = L.DomUtil.create('div');
                    element_name.innerText = legend_json.columns[col].elements[elem].name;
                    element_name.style.float = 'left';

                    const element_clear = L.DomUtil.create('div');
                    element_clear.style.clear = 'left';

                    element_div.appendChild(element_color);
                    element_div.appendChild(element_name);
                    element_div.appendChild(element_clear);

                    column_div.appendChild(element_div);
                }

            }

        });

        L.DomEvent.addListener(controlDiv, 'click', function(){
            
            L.DomUtil.addClass(controlDiv, 'special-tools-enable');
            L.DomUtil.removeClass(controlDiv, 'special-tools-disable');
            
            let elements_controls = special_tools.controlDiv.querySelectorAll('.special-tools-controls');

            try {
                special_tools.only_one_control_active(elements_controls, controlDiv);
            } catch (e) {};
            
            
            var chk_checked = false;
            
            if (legend_json.hasOwnProperty('enable')) {
                
                if (legend_json.enable) {
                    
                    chk_checked = true;
                    
                } else {
                    
                    chk_checked = false;
                    
                }
                
            }

            map.fire('modal', {
                
                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',
                
                onShow: function(evt){
                    
                    const modal = evt.modal;

                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                    
                    tool.google_translate({

                        element_html: modal_title,
                        str: "Leyenda", 
                        lang: lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');

                    const legend_name_div = L.DomUtil.create('div');
                    legend_name_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    
                    modal_body.appendChild(legend_name_div);
                    
                    const legend_name_span = L.DomUtil.create('span');
                    
                    legend_name_div.appendChild(legend_name_span);

                    tool.google_translate({

                        element_html: legend_name_span,
                        str: 'Leyenda: ', 
                        lang: lang

                    });
                    
                    const legend_name_input = L.DomUtil.create('input');
                    legend_name_input.type = 'text';
                    legend_name_input.id = 'legend_name_input';
                    legend_name_input.setAttribute('class', 'special-tools-input-150');
                    legend_name_input.value = legend_json.legend;
                    
                    legend_name_div.appendChild(legend_name_input);

                    const legend_btns_div = L.DomUtil.create('div');
                    legend_btns_div.setAttribute('class', 'special-tools-container special-tools-div-40');
                    
                    modal_body.appendChild(legend_btns_div);
                    
                    const legend_btn_add_column = L.DomUtil.create('button');
                    legend_btn_add_column.type = 'button';
                    legend_btn_add_column.id = 'legend_btn_add_column';
                    legend_btn_add_column.setAttribute('class', 'special-tools-btn-default');

                    legend_btns_div.appendChild(legend_btn_add_column);
                 
                    tool.google_translate({

                        element_html: legend_btn_add_column,
                        str: 'Nueva columna', 
                        lang: lang

                    });
                    
                    const legend_btn_save_legend = L.DomUtil.create('button');
                    legend_btn_save_legend.type = 'button';
                    legend_btn_save_legend.id = 'legend_btn_save_legend';
                    legend_btn_save_legend.setAttribute('class', 'special-tools-btn-primary');
                    legend_btn_save_legend.style.display = 'none';

                    legend_btns_div.appendChild(legend_btn_save_legend);
                 
                    tool.google_translate({

                        element_html: legend_btn_save_legend,
                        str: 'Guardar leyenda', 
                        lang: lang

                    });

                    const legend_show_hide_div = L.DomUtil.create('div');
                    legend_show_hide_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    
                    modal_body.appendChild(legend_show_hide_div);

                    const legend_show_hide_span = L.DomUtil.create('span');
                    
                    legend_show_hide_div.appendChild(legend_show_hide_span);
                    
                    tool.google_translate({

                        element_html: legend_show_hide_span,
                        str: 'Mostrar leyenda: ', 
                        lang: lang

                    });
                    
                    const chk_show_legend = L.DomUtil.create('input');
                    chk_show_legend.type = 'checkbox';
                    chk_show_legend.id = 'chk_show_legend';
                    chk_show_legend.checked = chk_checked;
                    
                    legend_show_hide_div.appendChild(chk_show_legend);
                    
                    const clear_left_div = L.DomUtil.create('div');
                    clear_left_div.style.clear = 'left';
                    
                    modal_body.appendChild(clear_left_div);

                    const columns_div_container = L.DomUtil.create('div');
                    columns_div_container.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(columns_div_container);
                    
                    const columns_div = L.DomUtil.create('div');
                    columns_div.id = 'columns_div';
                    
                    columns_div_container.appendChild(columns_div);

                    let options = {};

                    let promise = tool.legends(options);
                    
                    promise.then(function(data){

                        legend_json = JSON.parse(data.content);
                        
                    });
                    
                    const _legend_name_input = modal._container.querySelector('#legend_name_input');
                    
                    const _legend_btn_save_legend = modal._container.querySelector('#legend_btn_save_legend');
                    
                    const _legend_btn_add_column = modal._container.querySelector('#legend_btn_add_column');
                    
                    const _columns_div = modal._container.querySelector('#columns_div');
                    
                    const _chk_show_legend = modal._container.querySelector('#chk_show_legend');

                    L.DomEvent.on(_legend_name_input, 'keyup', function(){
                        
                        legend_json.legend = special_tools.strip_tags(this.value);
                        
                    });
                    
                    L.DomEvent.on(_legend_name_input, 'focusout', function(){

                        _legend_btn_save_legend.click();

                    });
                    
                    L.DomEvent.on(_chk_show_legend, 'click', function() {
                        
                        if (this.checked) {
                            
                            self.legend_div.style.display = 'block';
                            legend_json.enable = true;
                            
                            
                        } else {
                            
                            self.legend_div.style.display = 'none';
                            legend_json.enable = false;
                            
                        }
                        
                        _legend_btn_save_legend.click();
                        
                    });
                    
                    L.DomEvent.on(_legend_btn_save_legend, 'click', function(){

                        legend_json.legend = special_tools.strip_tags(_legend_name_input.value);
                        legend_json.columns = columns;
                        
                        let options = {content: JSON.stringify(legend_json)};

                        let promise = tool.legends(options);

                        promise.then(function(data){
                            
                            legend_json = JSON.parse(data.content);
                            
                        });
                        
                        self.legend_div.innerHTML = '';
                        
                        const legend_title_value = modal._container.querySelector('#legend_name_input').value;

                        const legend_title = L.DomUtil.create('div');
                        legend_title.setAttribute('class', 'special-tools-legend-name');
                        legend_title.innerText = special_tools.strip_tags(legend_title_value);
                        
                        self.legend_div.appendChild(legend_title);
                        
                        for (let col in columns) {
                            
                            const column_div = L.DomUtil.create('div');
                            
                            column_div.setAttribute('class', 'special-tools-column-div');
                            
                            const column_name = L.DomUtil.create('div');
                            column_name.setAttribute('class', 'special-tools-container special-tools-column-name');
                            column_name.innerText = columns[col].name;;
                            
                            column_div.appendChild(column_name);
                            
                            self.legend_div.appendChild(column_div);
                            
                            for (let elem in columns[col].elements) {
                                
                                const element_div = L.DomUtil.create('div');
                                
                                const element_color = L.DomUtil.create('div');
                                element_color.style.backgroundColor = columns[col].elements[elem].color;
                                element_color.style.width = '8px';
                                element_color.style.height = '8px';
                                element_color.style.marginTop = '3px';
                                element_color.style.marginRight = '4px';
                                element_color.style.float = 'left';
                                
                                const element_name = L.DomUtil.create('div');
                                element_name.innerText = columns[col].elements[elem].name;
                                element_name.style.float = 'left';
                                
                                const element_clear = L.DomUtil.create('div');
                                element_clear.style.clear = 'left';

                                element_div.appendChild(element_color);
                                element_div.appendChild(element_name);
                                element_div.appendChild(element_clear);

                                column_div.appendChild(element_div);
                            }
                            
                        }
                        
                        special_tools.modal_message(special_tools, "Leyenda guardada con éxito", lang);
                        
                    });

                    var columns = legend_json.columns;
                    
                    for (let index in legend_json.columns) {
                        
                        const div = L.DomUtil.create('div');
                        div.style.borderTop = '1px solid #1ACBED';
                        div.setAttribute('class', 'div-column');

                        const div_container_1 = L.DomUtil.create('div');
                        div_container_1.setAttribute('class', 'special-tools-container special-tools-div-33');

                        const input_column_span = L.DomUtil.create('span');
                        
                        tool.google_translate({

                            element_html: input_column_span,
                            str: 'Columna: ', 
                            lang: lang

                        });
                        
                        const input_column = L.DomUtil.create('input');
                        input_column.type = 'text';
                        input_column.setAttribute('class', 'special-tools-input-150');
                        input_column.setAttribute('index-column', index);
                        input_column.value = legend_json.columns[index].name;
                        
                        div_container_1.appendChild(input_column_span);
                        div_container_1.appendChild(input_column);
                        
                        
                        const div_container_2 = L.DomUtil.create('div');
                        div_container_2.setAttribute('class', 'special-tools-container special-tools-div-50');
                        
                        const btn_column_add_element = L.DomUtil.create('button');
                        btn_column_add_element.type = 'button';
                        btn_column_add_element.setAttribute('class', 'special-tools-btn-default');
                        btn_column_add_element.setAttribute('index-column', index);
                        
                        tool.google_translate({

                            element_html: btn_column_add_element,
                            str: 'Añadir elemento', 
                            lang: lang

                        });
                        
                        const btn_column_delete = L.DomUtil.create('button');
                        btn_column_delete.setAttribute('class', 'special-tools-btn-danger');
                        btn_column_delete.setAttribute('index-column', index);
                        
                        tool.google_translate({

                            element_html: btn_column_delete,
                            str: 'Eliminar columna', 
                            lang: lang

                        });
                        
                        div_container_2.appendChild(btn_column_add_element);
                        div_container_2.appendChild(btn_column_delete);
                        
                        const div_clear = L.DomUtil.create('div');
                        div_clear.style.clear = 'left';
                        
                        const div_column = L.DomUtil.create('div');
                        
                        div.appendChild(div_container_1);
                        div.appendChild(div_container_2);
                        div.appendChild(div_clear);
                        div.appendChild(div_column);

                        _columns_div.appendChild(div);
                        
                         L.DomEvent.on(btn_column_delete, 'click', function() {
                             
                            this.disabled = true;
                            
                            const index_column = this.getAttribute('index-column');
                            
                            delete columns[parseInt(index_column)];
                            
                            columns = columns.flat();
                            
                            special_tools.modal_message(special_tools, "Columna eliminada con éxito.", lang);
                            
                            window.setTimeout(function() {
                                
                                _legend_btn_save_legend.click();
                                
                            }, 3000);
                            
                            window.setTimeout(function(){
                                
                                L.DomUtil.remove(div);

                            }, 500);
                            
                            
                            const columns_list = _columns_div.querySelectorAll('.div-column');
                            
                            for (x = 0; x < columns_list.length; x++) {
                                
                                columns_list[x].children[0].querySelector('input').setAttribute('index-column', x);
                                columns_list[x].children[1].querySelectorAll('button')[0].setAttribute('index-column', x);
                                columns_list[x].children[1].querySelectorAll('button')[1].setAttribute('index-column', x);
                                
                                const elements_list = columns_list[x].children[2].querySelectorAll('.div-elements');

                                for (y = 0; y < elements_list.length; y++) {

                                    elements_list[y].children[1].setAttribute('index-column', x);
                                    elements_list[y].children[2].setAttribute('index-column', x);
                                    elements_list[y].children[3].setAttribute('index-column', x);

                                }
                                
                            } 
                            
                        });
                        
                        L.DomEvent.on(input_column, 'keyup', function(){
                            
                            this.setAttribute('value', this.value);
                            
                            const _index_column = this.getAttribute('index-column');
                            
                            columns[parseInt(_index_column)].name = special_tools.strip_tags(this.value);
                            
                        });
                        
                        L.DomEvent.on(input_column, 'focusout', function(){

                            _legend_btn_save_legend.click();

                        });
                        
                        L.DomEvent.on(btn_column_add_element, 'click', function() {
                            
                            const index_column = parseInt(this.getAttribute('index-column'));
                            let index_element;
                            
                            if (columns[index_column].elements.length === 0) {
                                
                                columns[index_column].elements[0] = {
                                    
                                    "name": "",
                                    "color": "#000000"
                                    
                                };
                                
                                index_element = 0;
                                
                            } else {
                                
                                columns[parseInt(index_column)].elements[columns[parseInt(index_column)].elements.length] = {
                                    
                                    "name": "",
                                    "color": "#000000"
                                    
                                };
                                
                                index_element = columns[index_column].elements.length-1;

                            }
                            
                            const column = L.DomUtil.create('div');
                            column.setAttribute('class', 'special-tools-container div-elements');
                            
                            const element_name_span = L.DomUtil.create('span');
                            
                            tool.google_translate({

                                element_html: element_name_span,
                                str: 'Elemento: ', 
                                lang: lang

                            });
                            
                            const element_name = L.DomUtil.create('input');
                            element_name.type = 'text';
                            element_name.setAttribute('class', 'special-tools-input-150');
                            element_name.setAttribute('index-column', index_column);
                            element_name.setAttribute('index-element', index_element);
                            
                            const element_color = L.DomUtil.create('input');
                            element_color.type = 'color';
                            element_color.style.margin = '5px';
                            element_color.setAttribute('index-column', index_column);
                            element_color.setAttribute('index-element', index_element);
                            
                            const element_delete = L.DomUtil.create('button');
                            element_delete.innerHTML = "<img width='20' height='20' src='" + tool.controls_url() + "/leaflet.control.SpecialToolsLegend/img/trash.png'>";
                            element_delete.setAttribute('class', 'special-tools-btn-danger');
                            element_delete.setAttribute('index-column', index_column);
                            element_delete.setAttribute('index-element', index_element);
                            
                            column.appendChild(element_name_span);
                            column.appendChild(element_name);
                            column.appendChild(element_color);
                            column.appendChild(element_delete);
                            
                            div_column.appendChild(column);
                            
                            special_tools.modal_message(special_tools, "Elemento creado con éxito", lang);
                            
                            window.setTimeout(function() {
                                
                               _legend_btn_save_legend.click(); 
                                
                            }, 3000);
                            

                            L.DomEvent.on(element_name, 'keyup', function(){
                                
                                this.setAttribute('value', this.value);
                                
                                const _index_column = parseInt(this.getAttribute('index-column'));
                                const _index_element = parseInt(this.getAttribute('index-element'));
                                
                                columns[_index_column].elements[_index_element].name = special_tools.strip_tags(this.value);
                                
                            });
                            
                            L.DomEvent.on(element_name, 'focusout', function(){

                               _legend_btn_save_legend.click();

                           });
                            
                            L.DomEvent.on(element_color, 'input change', function(){
                                
                                this.setAttribute('value', this.value);
                                
                                const _index_column = parseInt(this.getAttribute('index-column'));
                                const _index_element = parseInt(this.getAttribute('index-element'));
                                
                                if (special_tools.is_hex_color(this.value)) {
                                    
                                    columns[_index_column].elements[_index_element].color = this.value;
                                    
                                }

                            });
                            
                            L.DomEvent.on(element_color, 'change', function() {
                                
                                _legend_btn_save_legend.click();
                                
                            });
                            
                            L.DomEvent.on(element_delete, 'click', function() {
                                
                                this.disabled = true;
                                
                                const index_column = parseInt(this.getAttribute('index-column'));
                                
                                const index_element = parseInt(this.getAttribute('index-element'));
                                
                                delete columns[index_column].elements[index_element];
                                
                                columns[index_column].elements = columns[index_column].elements.flat();
                                
                                special_tools.modal_message(special_tools, "Elemento eliminado con éxito.", lang);
                                
                                window.setTimeout(function() {
                                    
                                    _legend_btn_save_legend.click();
                                    
                                }, 3000);
                                
                                window.setTimeout(function(){
                                    
                                    L.DomUtil.remove(column);

                                }, 500);
                                
                                const elements_list = div_column.querySelectorAll('.div-elements');

                                for (x = 0; x < elements_list.length; x++) {

                                    elements_list[x].children[1].setAttribute('index-element', x);
                                    elements_list[x].children[2].setAttribute('index-element', x);
                                    elements_list[x].children[3].setAttribute('index-element', x);

                                }
                                
                            });
                          
                        });

                        for (let index_elem in columns[index].elements) {
                            
                            const column = L.DomUtil.create('div');
                            column.setAttribute('class', 'special-tools-container div-elements');
                            
                            const element_name_span = L.DomUtil.create('span');
                            
                            tool.google_translate({

                                element_html: element_name_span,
                                str: 'Elemento: ', 
                                lang: lang

                            });
                            
                            const element_name = L.DomUtil.create('input');
                            element_name.type = 'text';
                            element_name.setAttribute('class', 'special-tools-input-150');
                            element_name.setAttribute('index-column', index);
                            element_name.setAttribute('index-element', index_elem);
                            element_name.value = columns[index].elements[index_elem].name;
                            
                            const element_color = L.DomUtil.create('input');
                            element_color.type = 'color';
                            element_color.style.margin = '5px';
                            element_color.setAttribute('index-column', index);
                            element_color.setAttribute('index-element',index_elem);
                            element_color.value = columns[index].elements[index_elem].color;
                            
                            const element_delete = L.DomUtil.create('button');
                            element_delete.innerHTML = "<img width='20' height='20' src='" + tool.controls_url() + "/leaflet.control.SpecialToolsLegend/img/trash.png'>";
                            element_delete.setAttribute('class', 'special-tools-btn-danger');
                            element_delete.setAttribute('index-column',index);
                            element_delete.setAttribute('index-element', index_elem);
                            
                            column.appendChild(element_name_span);
                            column.appendChild(element_name);
                            column.appendChild(element_color);
                            column.appendChild(element_delete);
                            
                            div_column.appendChild(column);

                            L.DomEvent.on(element_name, 'keyup', function(){
                                
                                this.setAttribute('value', this.value);
                                
                                const index_column = parseInt(this.getAttribute('index-column'));
                                const index_element = parseInt(this.getAttribute('index-element'));
                                
                                columns[index_column].elements[index_element].name = special_tools.strip_tags(this.value);
                                
                            });
                            
                            L.DomEvent.on(element_name, 'focusout', function(){

                                _legend_btn_save_legend.click();

                            });
                            
                            L.DomEvent.on(element_color, 'input change', function(){
                                
                                this.setAttribute('value', this.value);
                                
                                const index_column = parseInt(this.getAttribute('index-column'));
                                const index_element = parseInt(this.getAttribute('index-element'));
                                
                                if (special_tools.is_hex_color(this.value)) {
                                    
                                    columns[index_column].elements[index_element].color = this.value;

                                }
                                
                            });
                            
                            L.DomEvent.on(element_color, 'change', function() {
                                
                                _legend_btn_save_legend.click();
                                
                            });
                            
                            L.DomEvent.on(element_delete, 'click', function(){
                                
                                this.disabled = true;
                                
                                const index_column = parseInt(this.getAttribute('index-column'));
                                
                                const index_element = parseInt(this.getAttribute('index-element'));
                                
                                delete columns[index_column].elements[index_element];
                                
                                columns[index_column].elements = columns[index_column].elements.flat();
                                
                                special_tools.modal_message(special_tools, "Elemento eliminado con éxito.", lang);
                                
                                window.setTimeout(function() {
                                    
                                    _legend_btn_save_legend.click();
                                    
                                }, 3000);
                                
                                window.setTimeout(function(){
                                
                                    L.DomUtil.remove(column);

                                }, 500);
                                
                                const elements_list = div_column.querySelectorAll('.div-elements');

                                for (x = 0; x < elements_list.length; x++) {

                                    elements_list[x].children[1].setAttribute('index-element', x);
                                    elements_list[x].children[2].setAttribute('index-element', x);
                                    elements_list[x].children[3].setAttribute('index-element', x);

                                }
                                
                            });  
                        }
                    }
                    
                    L.DomEvent.on(_legend_btn_add_column, 'click', function(){
                        
                        let index_column;
                        
                        if (columns.length === 4) {

                            special_tools.modal_message(special_tools, "El número máximo de columnas permitidas son 4", lang);

                            return;
                            
                        }
                        
                        if (columns.length === 0) {
                            
                        columns[0] = {
                            
                            "name": "",
                            "elements": []
                            
                        };
                        
                        index_column = 0;
                                             
                        } else {
                            
                            columns[columns.length] = {
                                
                                "name": "",
                                "elements": []
                            };
                            
                            index_column = columns.length-1;
                            
                        }

                        const div = L.DomUtil.create('div');
                        div.style.borderTop = '1px solid #1ACBED';
                        div.setAttribute('class', 'div-column');

                        const div_container_1 = L.DomUtil.create('div');
                        div_container_1.setAttribute('class', 'special-tools-container special-tools-div-33');

                        const input_column_span = L.DomUtil.create('span');
                        
                        tool.google_translate({

                            element_html: input_column_span,
                            str: 'Columna: ', 
                            lang: lang

                        });
                        
                        const input_column = L.DomUtil.create('input');
                        input_column.type = 'text';
                        input_column.setAttribute('class', 'special-tools-input-150');
                        input_column.setAttribute('index-column', index_column);
                        
                        div_container_1.appendChild(input_column_span);
                        div_container_1.appendChild(input_column);

                        const div_container_2 = L.DomUtil.create('div');
                        div_container_2.setAttribute('class', 'special-tools-container special-tools-div-50');
                        
                        const btn_column_add_element = L.DomUtil.create('button');
                        btn_column_add_element.type = 'button';
                        btn_column_add_element.setAttribute('class', 'special-tools-btn-default');
                        btn_column_add_element.setAttribute('index-column', index_column);
        
                        tool.google_translate({

                            element_html: btn_column_add_element,
                            str: 'Añadir elemento', 
                            lang: lang

                        });
                        
                        const btn_column_delete = L.DomUtil.create('button');
                        btn_column_delete.setAttribute('class', 'special-tools-btn-danger');
                        btn_column_delete.setAttribute('index-column', index_column);
                        
                        tool.google_translate({

                            element_html: btn_column_delete,
                            str: 'Eliminar columna', 
                            lang: lang

                        });
                        
                        div_container_2.appendChild(btn_column_add_element);
                        div_container_2.appendChild(btn_column_delete);
                        
                        const div_clear = L.DomUtil.create('div');
                        div_clear.style.clear = 'left';
                        
                        const div_column = L.DomUtil.create('div');
                        
                        div.appendChild(div_container_1);
                        div.appendChild(div_container_2);
                        div.appendChild(div_clear);
                        div.appendChild(div_column);

                        _columns_div.appendChild(div);
                        
                        L.DomEvent.on(btn_column_delete, 'click', function(){
                            
                            this.disabled = true;
                            
                            const index_column = this.getAttribute('index-column');
                            
                            delete columns[parseInt(index_column)];
                            
                            columns = columns.flat();
                            
                            special_tools.modal_message(special_tools, "Columna eliminada con éxito.", lang);
                            
                            window.setTimeout(function() {
                                
                                _legend_btn_save_legend.click();
                                
                            }, 3000);
                            
                            window.setTimeout(function(){
                            
                                L.DomUtil.remove(div);

                            }, 500);
                            
                            const columns_list = _columns_div.querySelectorAll('.div-column');
                            
                            for (x = 0; x < columns_list.length; x++) {
                                
                                columns_list[x].children[0].querySelector('input').setAttribute('index-column', x);
                                columns_list[x].children[1].querySelectorAll('button')[0].setAttribute('index-column', x);
                                columns_list[x].children[1].querySelectorAll('button')[1].setAttribute('index-column', x);
                                
                                const elements_list = columns_list[x].children[2].querySelectorAll('.div-elements');

                                for (y = 0; y < elements_list.length; y++) {

                                    elements_list[y].children[1].setAttribute('index-column', x);
                                    elements_list[y].children[2].setAttribute('index-column', x);
                                    elements_list[y].children[3].setAttribute('index-column', x);

                                }
                                
                            } 
                            
                        });

                        L.DomEvent.on(input_column, 'keyup', function(){
                            
                            this.setAttribute('value', this.value);
                            
                            const index_column = this.getAttribute('index-column')
                            
                            columns[parseInt(index_column)].name = special_tools.strip_tags(this.value);
                            
                        });
                        
                        L.DomEvent.on(input_column, 'focusout', function(){

                            _legend_btn_save_legend.click();

                        });

                        L.DomEvent.on(btn_column_add_element, 'click', function(){
                            
                            const index_column = parseInt(this.getAttribute('index-column'));
                            let index_element;
                            
                            if (columns[index_column].elements.length === 0) {
                                
                                columns[index_column].elements[0] = {
                                    
                                    "name": "",
                                    "color": "#000000"
                                    
                                };
                                
                                index_element = 0;
                                
                            } else {
                                
                                columns[parseInt(index_column)].elements[columns[parseInt(index_column)].elements.length] = {
                                    
                                    "name": "",
                                    "color": "#000000"
                                    
                                };
                                
                               index_element = columns[index_column].elements.length-1;

                            }
                            
                            const column = L.DomUtil.create('div');
                            column.setAttribute('class', 'special-tools-container div-elements');
                            
                            const element_name_span = L.DomUtil.create('span');
                            
                            tool.google_translate({

                                element_html: element_name_span,
                                str: 'Elemento: ', 
                                lang: lang

                            });
                            
                            const element_name = L.DomUtil.create('input');
                            element_name.type = 'text';
                            element_name.setAttribute('class', 'special-tools-input-150');
                            element_name.setAttribute('index-column', index_column);
                            element_name.setAttribute('index-element', index_element);
                            
                            const element_color = L.DomUtil.create('input');
                            element_color.type = 'color';
                            element_color.style.margin = '5px';
                            element_color.setAttribute('index-column', index_column);
                            element_color.setAttribute('index-element', index_element);
                            
                            const element_delete = L.DomUtil.create('button');
                            element_delete.innerHTML = "<img width='20' height='20' src='" + tool.controls_url() + "/leaflet.control.SpecialToolsLegend/img/trash.png'>";
                            element_delete.setAttribute('class', 'special-tools-btn-danger');
                            element_delete.setAttribute('index-column', index_column);
                            element_delete.setAttribute('index-element', index_element);
                            
                            column.appendChild(element_name_span);
                            column.appendChild(element_name);
                            column.appendChild(element_color);
                            column.appendChild(element_delete);
                            
                            div_column.appendChild(column);
                            
                            special_tools.modal_message(special_tools, "Elemento creado con éxito.", lang);
                            
                            window.setTimeout(function() {
                                
                                _legend_btn_save_legend.click();
                                
                            }, 3000);

                            L.DomEvent.on(element_name, 'keyup', function(){
                                
                                this.setAttribute('value', this.value);
                                
                                const index_column = parseInt(this.getAttribute('index-column'));
                                const index_element = parseInt(this.getAttribute('index-element'));
                                
                                columns[index_column].elements[index_element].name = special_tools.strip_tags(this.value);
                                
                            });
                            
                            L.DomEvent.on(element_name, 'focusout', function(){
                                
                                special_tools.modal_message(special_tools, "Elemento guardado con éxito.", lang);
                                
                                window.setTimeout(function() {
                                    
                                    _legend_btn_save_legend.click();
                                    
                                }, 3000);
                                
                            });
                            
                            L.DomEvent.on(element_color, 'input change', function(){
                                
                                this.setAttribute('value', this.value);
                                
                                const index_column = parseInt(this.getAttribute('index-column'));
                                const index_element = parseInt(this.getAttribute('index-element'));
                                
                                if (special_tools.is_hex_color(this.value)) {
                                
                                    columns[index_column].elements[index_element].color = this.value;
                                
                                }
                                
                            });
                            
                            L.DomEvent.on(element_color, 'change', function() {
                                
                                _legend_btn_save_legend.click();
                                
                            });
                            
                            L.DomEvent.on(element_delete, 'click', function(){
                                
                                const index_column = parseInt(this.getAttribute('index-column'));
                                
                                const index_element = parseInt(this.getAttribute('index-element'));
                                
                                delete columns[index_column].elements[index_element];
                                
                                columns[index_column].elements = columns[index_column].elements.flat();
                                
                                special_tools.modal_message(special_tools, "Elemento eliminado con éxito.", lang);
                                
                                window.setTimeout(function() {
                                    
                                    _legend_btn_save_legend.click();
                                    
                                }, 3000);
                                
                                window.setTimeout(function(){
                                
                                    L.DomUtil.remove(column);
                                
                                }, 500);
                                
                                const elements_list = div_column.querySelectorAll('.div-elements');

                                for (x = 0; x < elements_list.length; x++) {

                                    elements_list[x].children[1].setAttribute('index-element', x);
                                    elements_list[x].children[2].setAttribute('index-element', x);
                                    elements_list[x].children[3].setAttribute('index-element', x);

                                }
                                
                            });
                          
                        });
                        
                        special_tools.modal_message(special_tools, "Columna creada con éxito", lang);
                        
                        window.setTimeout(function() {
                            
                            _legend_btn_save_legend.click();
                            
                        }, 3000);

                    });

                },
                
                onHide: function() {
                    
                    L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-enable');
                
                }
                
            });
             
        });
               
        false_div = L.DomUtil.create('div');
        
        return false_div;
        
    }
});

L.control.specialToolsLegend = function (options) {
    
    return new L.Control.SpecialToolsLegend(options);
    
};
