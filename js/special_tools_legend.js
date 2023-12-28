export const special_tools_legend = function() {

	return true;
        
};

special_tools_legend.prototype.load = async function(L, special_tools) {
    
    special_tools_legend.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsLegend = L.Control.extend({

        onAdd: function() {
            
            const self = special_tools_legend.prototype.special_tools;
            
            const controlDiv = L.DomUtil.create('div', 'special-tools-legend special-tools-controls special-tools-disable');
            
            special_tools_legend.prototype.controlDiv = controlDiv;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Leyenda', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);
            
            self.legend_div_container = L.DomUtil.create('div', 'special-tools-container-legend-div');

            self.legend_div = L.DomUtil.create('div', 'special-tools-legend-div');

            self.legend_div.style.left = ((self.map.getSize().x / 2)) + "px";

            self.map.on('resize', function(e) {

                self.legend_div.style.left = ((e.newSize.x / 2)) + "px";

            });

            self.map._controlCorners.topleft.appendChild(self.legend_div);

            if (self.map.getSize().x >= 800) {

                self.special_tools_btns.appendChild(controlDiv);

            } else {

                self.legend_div.style.display = 'none';
                controlDiv.style.display = 'none';

            }

            let options = {};
        
            let promise = self.tool.legends(options);
            
            promise.then(function(data) { 
                
                if (self.map.getSize().x >= 800) {

                    special_tools_legend.prototype.init_legend(data);
                    
                }

            });
            
            L.DomEvent.addListener(controlDiv, 'click', function(){

                L.DomUtil.addClass(controlDiv, 'special-tools-enable');
                L.DomUtil.removeClass(controlDiv, 'special-tools-disable');

                self.only_one_active_control(controlDiv);
                
                special_tools_legend.prototype.load_modal();
                
            });
            
            const false_div = L.DomUtil.create('div');

            return false_div;
            
        }
            
    });
    

    L.control.specialToolsLegend = function (options) {

        return new L.Control.SpecialToolsLegend(options);

    };
    
};

special_tools_legend.prototype.init_legend = function(data) {
    
    const self = this.special_tools;
    
    self.legend_json = JSON.parse(data.content);

    if (self.legend_json.hasOwnProperty('enable')) {

        if (self.legend_json.enable) {

            self.legend_div.style.display = 'block';

        } else {

            self.legend_div.style.display = 'none';

        }

    }

    self.legend_div.innerHTML = '';

    const legend_title = L.DomUtil.create('div');
    legend_title.setAttribute('class', 'special-tools-legend-name');
    
    self.tool.google_translate({
        
        element_html: legend_title,
        str: self.legend_json.legend,
        lang: self.lang
        
    });

    self.legend_div.appendChild(legend_title);
    
    const count_columns = self.legend_json.columns.length;
    
    if (count_columns === 0 || count_columns === 1) {
        
        self.legend_div.style.width = '200px';
        
    } else if (count_columns === 2) {
        
        self.legend_div.style.width = '400px';
        
    } else if (count_columns === 3) {
        
        self.legend_div.style.width = '600px';
        
    }

    for (let col in self.legend_json.columns) {

        const column_div = L.DomUtil.create('div');

        if (count_columns === 1) {
            
            column_div.setAttribute('class', 'special-tools-div-100');
            
        } else if (count_columns === 2) {
            
            column_div.setAttribute('class', 'special-tools-div-50');
            
        } else if (count_columns === 3) {
            
            column_div.setAttribute('class', 'special-tools-div-33');
            
        }

        const column_name = L.DomUtil.create('div');
        column_name.setAttribute('class', 'special-tools-container special-tools-column-name');
        
        self.tool.google_translate({
            
            element_html: column_name,
            str: self.legend_json.columns[col].name,
            lang: self.lang
            
        });

        column_div.appendChild(column_name);

        self.legend_div.appendChild(column_div);

        for (let elem in self.legend_json.columns[col].elements) {

            const element_div = L.DomUtil.create('div');

            const element_image = L.DomUtil.create('img');
            element_image.width = 18;
            element_image.height = 18;
            element_image.src = self.legend_json.columns[col].elements[elem].icon;
            element_image.style.float = 'left';


            const element_name = L.DomUtil.create('div');
            element_name.setAttribute('class', 'special-tools-legend-element-name');
            
            self.tool.google_translate({
                
                element_html: element_name,
                str: self.legend_json.columns[col].elements[elem].name,
                lang: self.lang
                
            });

            const element_clear = L.DomUtil.create('div');
            element_clear.style.clear = 'left';
            
            const space = L.DomUtil.create('div');
            space.style.marginTop = '2px';

            element_div.appendChild(element_image);
            element_div.appendChild(element_name);
            element_div.appendChild(element_clear);
            element_div.appendChild(space);

            column_div.appendChild(element_div);
        }

    }
    
};

special_tools_legend.prototype.load_modal = function() {
    
    const self = this.special_tools;
    const _this = this;
    
    var chk_checked = false;

    if (self.legend_json.hasOwnProperty('enable')) {

        if (self.legend_json.enable) {

            chk_checked = true;

        } else {

            chk_checked = false;

        }

    }

    /**************************************************************************/

    const modal = self.new_modal("Leyenda");

    const modal_body = modal._container.querySelector('.modal-body');

    /**************************************************************************/

    const legend_name_div = L.DomUtil.create('div');
    legend_name_div.setAttribute('class', 'special-tools-container special-tools-div-33');

    modal_body.appendChild(legend_name_div);
    
    /**************************************************************************/

    const legend_name_span = L.DomUtil.create('span');

    self.tool.google_translate({

        element_html: legend_name_span,
        str: 'Leyenda:', 
        lang: self.lang

    });
    
    legend_name_div.appendChild(legend_name_span);
    
    /**************************************************************************/

    const legend_name_input = L.DomUtil.create('input');
    legend_name_input.type = 'text';
    legend_name_input.id = 'legend_name_input';
    legend_name_input.setAttribute('class', 'special-tools-input-150');
    legend_name_input.value = self.legend_json.legend;

    legend_name_div.appendChild(legend_name_input);
    
    /**************************************************************************/

    const legend_btns_div = L.DomUtil.create('div');
    legend_btns_div.setAttribute('class', 'special-tools-container special-tools-div-40');

    modal_body.appendChild(legend_btns_div);
    
    /**************************************************************************/

    const legend_btn_add_column = L.DomUtil.create('button');
    legend_btn_add_column.type = 'button';
    legend_btn_add_column.id = 'legend_btn_add_column';
    legend_btn_add_column.setAttribute('class', 'special-tools-btn-default');
    
    self.tool.google_translate({

        element_html: legend_btn_add_column,
        str: 'Nueva columna', 
        lang: self.lang

    });

    legend_btns_div.appendChild(legend_btn_add_column);
    
    /**************************************************************************/

    const legend_btn_save_legend = L.DomUtil.create('button');
    legend_btn_save_legend.type = 'button';
    legend_btn_save_legend.id = 'legend_btn_save_legend';
    legend_btn_save_legend.setAttribute('class', 'special-tools-btn-primary');
    legend_btn_save_legend.style.display = 'none';

    self.tool.google_translate({

        element_html: legend_btn_save_legend,
        str: 'Guardar leyenda', 
        lang: self.lang

    });

    legend_btns_div.appendChild(legend_btn_save_legend);

    /**************************************************************************/

    const legend_show_hide_div = L.DomUtil.create('div');
    legend_show_hide_div.setAttribute('class', 'special-tools-container special-tools-div-33');

    modal_body.appendChild(legend_show_hide_div);

    const legend_show_hide_span = L.DomUtil.create('span');
    
    self.tool.google_translate({

        element_html: legend_show_hide_span,
        str: 'Mostrar leyenda:', 
        lang: self.lang

    });

    legend_show_hide_div.appendChild(legend_show_hide_span);

    /**************************************************************************/
    
    const chk_show_legend = L.DomUtil.create('input');
    chk_show_legend.type = 'checkbox';
    chk_show_legend.id = 'chk_show_legend';
    chk_show_legend.checked = chk_checked;

    legend_show_hide_div.appendChild(chk_show_legend);
    
    /**************************************************************************/

    const clear_left_div = L.DomUtil.create('div');
    clear_left_div.style.clear = 'left';

    modal_body.appendChild(clear_left_div);
    
    /**************************************************************************/

    const columns_div_container = L.DomUtil.create('div');
    columns_div_container.setAttribute('class', 'special-tools-container');

    modal_body.appendChild(columns_div_container);
    
    /**************************************************************************/

    const columns_div = L.DomUtil.create('div');
    columns_div.id = 'columns_div';

    columns_div_container.appendChild(columns_div);
    
    /**************************************************************************/

    let options = {};

    let promise = self.tool.legends(options);

    promise.then(function(data) {

        self.legend_json = JSON.parse(data.content);

    });
    
    /**************************************************************************/

    self.legend_name_input = modal._container.querySelector('#legend_name_input');

    self.legend_btn_save_legend = modal._container.querySelector('#legend_btn_save_legend');

    self.legend_btn_add_column = modal._container.querySelector('#legend_btn_add_column');

    self.columns_div = modal._container.querySelector('#columns_div');

    self.chk_show_legend = modal._container.querySelector('#chk_show_legend');

    L.DomEvent.on(self.legend_name_input, 'keyup', function(){

        self.legend_json.legend = self.strip_tags(this.value);

    });

    L.DomEvent.on(self.legend_name_input, 'focusout', function(){

        self.legend_btn_save_legend.click();

    });

    L.DomEvent.on(self.chk_show_legend, 'click', function() {

        if (this.checked) {

            self.legend_div.style.display = 'block';
            self.legend_json.enable = true;


        } else {

            self.legend_div.style.display = 'none';
            self.legend_json.enable = false;

        }

        self.legend_btn_save_legend.click();

    });

    L.DomEvent.on(self.legend_btn_save_legend, 'click', function() {

        self.legend_json.legend = self.strip_tags(self.legend_name_input.value);
        self.legend_json.columns = self.columns;

        let options = {content: JSON.stringify(self.legend_json)};

        let promise = self.tool.legends(options);

        promise.then(function(data) {

            self.legend_json = JSON.parse(data.content);

        });

        self.legend_div.innerHTML = '';

        /**********************************************************************/

        const legend_title_value = modal._container.querySelector('#legend_name_input').value;

        const legend_title = L.DomUtil.create('div');
        legend_title.setAttribute('class', 'special-tools-legend-name');
        
        self.tool.google_translate({
            
            element_html: legend_title,
            str: self.strip_tags(legend_title_value),
            lang: self.lang
            
        });

        self.legend_div.appendChild(legend_title);
        
        /**********************************************************************/
        
        const count_columns = self.columns.length;
        
        if (count_columns === 0 || count_columns === 1) {
            
            self.legend_div.style.width = '200px';
            
        } else if (count_columns === 2) {
            
            self.legend_div.style.width = '400px';
            
        } else if (count_columns === 3) {
            
            self.legend_div.style.width = '600px';
            
        }

        for (let col in self.columns) {

            const column_div = L.DomUtil.create('div');
 
            if (count_columns === 1) {
                
                column_div.setAttribute('class', 'special-tools-div-100');
                
            } else if (count_columns === 2) {
                
                column_div.setAttribute('class', 'special-tools-div-50'); 
                
            } else if (count_columns === 3) {
                
                column_div.setAttribute('class', 'special-tools-div-33');
                
            }

            const column_name = L.DomUtil.create('div');
            column_name.setAttribute('class', 'special-tools-container special-tools-column-name');
            
            self.tool.google_translate({
                
                element_html: column_name,
                str: self.columns[col].name,
                lang: self.lang
                
            });

            column_div.appendChild(column_name);
            
            /******************************************************************/

            self.legend_div.appendChild(column_div);

            for (let elem in self.columns[col].elements) {

                const element_div = L.DomUtil.create('div');

                const element_image = L.DomUtil.create('img');
                element_image.src = self.columns[col].elements[elem].icon;
                element_image.width = 18;
                element_image.height = 18;
                element_image.style.float = 'left';
                

                const element_name = L.DomUtil.create('div');
                element_name.setAttribute('class', 'special-tools-legend-element-name');
                
                self.tool.google_translate({
                    
                    element_html: element_name,
                    str: self.columns[col].elements[elem].name,
                    lang: self.lang
                    
                });

                const element_clear = L.DomUtil.create('div');
                element_clear.style.clear = 'left';
                
                const space = L.DomUtil.create('div');
                space.style.marginTop = '2px';

                element_div.appendChild(element_image);
                element_div.appendChild(element_name);
                element_div.appendChild(element_clear);
                element_div.appendChild(space);

                column_div.appendChild(element_div);
            }

        }

    });

    self.columns = self.legend_json.columns;

    for (let index in self.legend_json.columns) {

        const div = L.DomUtil.create('div');
        div.style.borderTop = '1px solid #1ACBED';
        div.setAttribute('class', 'div-column');

        const div_container_1 = L.DomUtil.create('div');
        div_container_1.setAttribute('class', 'special-tools-container special-tools-div-33');

        const input_column_span = L.DomUtil.create('span');

        self.tool.google_translate({

            element_html: input_column_span,
            str: 'Columna:', 
            lang: self.lang

        });

        const input_column = L.DomUtil.create('input');
        input_column.type = 'text';
        input_column.setAttribute('class', 'special-tools-input-150');
        input_column.setAttribute('index-column', index);
        input_column.value = self.legend_json.columns[index].name;

        div_container_1.appendChild(input_column_span);
        div_container_1.appendChild(input_column);


        const div_container_2 = L.DomUtil.create('div');
        div_container_2.setAttribute('class', 'special-tools-container special-tools-div-50');

        const btn_column_add_element = L.DomUtil.create('button');
        btn_column_add_element.type = 'button';
        btn_column_add_element.setAttribute('class', 'special-tools-btn-default');
        btn_column_add_element.setAttribute('index-column', index);

        self.tool.google_translate({

            element_html: btn_column_add_element,
            str: 'Añadir elemento', 
            lang: self.lang

        });

        const btn_column_delete = L.DomUtil.create('button');
        btn_column_delete.setAttribute('class', 'special-tools-btn-danger');
        btn_column_delete.setAttribute('index-column', index);

        self.tool.google_translate({

            element_html: btn_column_delete,
            str: 'Eliminar columna', 
            lang: self.lang

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

        self.columns_div.appendChild(div);

         L.DomEvent.on(btn_column_delete, 'click', function() {

            this.disabled = true;

            const index_column = this.getAttribute('index-column');

            delete self.columns[parseInt(index_column)];

            self.columns = self.columns.flat();

            self.modal_message("Columna eliminada con éxito.");

            window.setTimeout(function() {

                self.legend_btn_save_legend.click();

            }, 3000);

            window.setTimeout(function(){

                L.DomUtil.remove(div);

            }, 500);

            const columns_list = self.columns_div.querySelectorAll('.div-column');

            for (let x = 0; x < columns_list.length; x++) {

                columns_list[x].children[0].querySelector('input').setAttribute('index-column', x);
                columns_list[x].children[1].querySelectorAll('button')[0].setAttribute('index-column', x);
                columns_list[x].children[1].querySelectorAll('button')[1].setAttribute('index-column', x);

                const elements_list = columns_list[x].children[2].querySelectorAll('.div-elements');

                for (let y = 0; y < elements_list.length; y++) {

                    elements_list[y].children[1].setAttribute('index-column', x);
                    elements_list[y].children[2].setAttribute('index-column', x);
                    elements_list[y].children[3].setAttribute('index-column', x);

                }

            } 

        });

        L.DomEvent.on(input_column, 'keyup', function(){

            this.setAttribute('value', this.value);

            const _index_column = this.getAttribute('index-column');

            self.columns[parseInt(_index_column)].name = self.strip_tags(this.value);

        });

        L.DomEvent.on(input_column, 'focusout', function(){

            self.legend_btn_save_legend.click();

        });

        L.DomEvent.on(btn_column_add_element, 'click', function() {

            const index_column = parseInt(this.getAttribute('index-column'));
            let index_element;

            if (self.columns[index_column].elements.length === 0) {

                self.columns[index_column].elements[0] = {

                    "name": "",
                    "icon": self.tool.tool_url() + '/img/pin.svg'

                };

                index_element = 0;

            } else {

                self.columns[parseInt(index_column)].elements[self.columns[parseInt(index_column)].elements.length] = {

                    "name": "",
                    "icon": self.tool.tool_url() + '/img/pin.svg'

                };

                index_element = self.columns[index_column].elements.length-1;

            }

            const column = L.DomUtil.create('div');
            column.setAttribute('class', 'special-tools-container div-elements');

            const element_name_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: element_name_span,
                str: 'Elemento:', 
                lang: self.lang

            });

            const element_name = L.DomUtil.create('input');
            element_name.type = 'text';
            element_name.setAttribute('class', 'special-tools-input-150');
            element_name.setAttribute('index-column', index_column);
            element_name.setAttribute('index-element', index_element);

            const element_icon_button = L.DomUtil.create('button');
            element_icon_button.type = 'button';
            element_icon_button.setAttribute('class', 'special-tools-btn-default');
            element_icon_button.setAttribute('index-column', index_column);
            element_icon_button.setAttribute('index-element', index_element);
            
            self.tool.google_translate({

                element_html: element_icon_button,
                str: 'Subir icono',
                lang: self.lang

            });
            
            self.tool.google_translate({
                
                element_html: element_icon_button,
                str: 'Tamaño recomendado 36x36',
                lang: self.lang,
                attribute: 'title'
                
            });

            const element_image = L.DomUtil.create('img');
            element_image.src = self.tool.tool_url() + '/img/pin.svg';
            element_image.width = 18;
            element_image.height = 18;

            const element_delete = L.DomUtil.create('button');
            element_delete.innerHTML = "<img width='14' height='14' src='" + self.tool.tool_url() + "/img/trash.png'>";
            element_delete.style.marginLeft = '6px';
            element_delete.setAttribute('class', 'special-tools-btn-danger');
            element_delete.setAttribute('index-column', index_column);
            element_delete.setAttribute('index-element', index_element);

            column.appendChild(element_name_span);
            column.appendChild(element_name);
            column.appendChild(element_icon_button);
            column.appendChild(element_image);
            column.appendChild(element_delete);

            div_column.appendChild(column);

            self.modal_message("Elemento creado con éxito");

            window.setTimeout(function() {

               self.legend_btn_save_legend.click(); 

            }, 3000);


            L.DomEvent.on(element_name, 'keyup', function(){

                this.setAttribute('value', this.value);

                const _index_column = parseInt(this.getAttribute('index-column'));
                const _index_element = parseInt(this.getAttribute('index-element'));

                self.columns[_index_column].elements[_index_element].name = self.strip_tags(this.value);

            });

            L.DomEvent.on(element_name, 'focusout', function(){

               self.legend_btn_save_legend.click();

           });

            L.DomEvent.on(element_icon_button, 'click', function() {

                const _index_column = parseInt(this.getAttribute('index-column'));
                const _index_element = parseInt(this.getAttribute('index-element'));
                
                _this.change_icon(element_image, _index_column, _index_element);


            });

            L.DomEvent.on(element_delete, 'click', function() {

                this.disabled = true;

                const index_column = parseInt(this.getAttribute('index-column'));

                const index_element = parseInt(this.getAttribute('index-element'));

                delete self.columns[index_column].elements[index_element];

                self.columns[index_column].elements = self.columns[index_column].elements.flat();

                self.modal_message("Elemento eliminado con éxito.");

                window.setTimeout(function() {

                    self.legend_btn_save_legend.click();

                }, 3000);

                window.setTimeout(function(){

                    L.DomUtil.remove(column);

                }, 500);

                const elements_list = div_column.querySelectorAll('.div-elements');

                for (let x = 0; x < elements_list.length; x++) {

                    elements_list[x].children[1].setAttribute('index-element', x);
                    elements_list[x].children[2].setAttribute('index-element', x);
                    elements_list[x].children[3].setAttribute('index-element', x);

                }

            });

        });

        for (let index_elem in self.columns[index].elements) {

            const column = L.DomUtil.create('div');
            column.setAttribute('class', 'special-tools-container div-elements');

            const element_name_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: element_name_span,
                str: 'Elemento:', 
                lang: self.lang

            });

            const element_name = L.DomUtil.create('input');
            element_name.type = 'text';
            element_name.setAttribute('class', 'special-tools-input-150');
            element_name.setAttribute('index-column', index);
            element_name.setAttribute('index-element', index_elem);
            element_name.value = self.columns[index].elements[index_elem].name;
            
            const element_icon_button = L.DomUtil.create('button');
            element_icon_button.type = 'button';
            element_icon_button.setAttribute('class', 'special-tools-btn-default');
            element_icon_button.setAttribute('index-column', index);
            element_icon_button.setAttribute('index-element', index_elem);
            
            self.tool.google_translate({

                element_html: element_icon_button,
                str: 'Subir icono',
                lang: self.lang

            });
            
            self.tool.google_translate({
                
                element_html: element_icon_button,
                str: 'Tamaño recomendado 36x36',
                lang: self.lang,
                attribute: 'title'
                
            });

            const element_image = L.DomUtil.create('img');
            element_image.src = self.columns[index].elements[index_elem].icon;
            element_image.width = 18;
            element_image.height = 18;

            const element_delete = L.DomUtil.create('button');
            element_delete.innerHTML = "<img width='14' height='14' src='" + self.tool.tool_url() + "/img/trash.png'>";
            element_delete.style.marginLeft = '6px';
            element_delete.setAttribute('class', 'special-tools-btn-danger');
            element_delete.setAttribute('index-column',index);
            element_delete.setAttribute('index-element', index_elem);

            column.appendChild(element_name_span);
            column.appendChild(element_name);
            column.appendChild(element_icon_button);
            column.appendChild(element_image);
            column.appendChild(element_delete);

            div_column.appendChild(column);

            L.DomEvent.on(element_name, 'keyup', function(){

                this.setAttribute('value', this.value);

                const index_column = parseInt(this.getAttribute('index-column'));
                const index_element = parseInt(this.getAttribute('index-element'));

                self.columns[index_column].elements[index_element].name = self.strip_tags(this.value);

            });

            L.DomEvent.on(element_name, 'focusout', function() {

                self.legend_btn_save_legend.click();

            });

            L.DomEvent.on(element_icon_button, 'click', function() {

                const index_column = parseInt(this.getAttribute('index-column'));
                const index_element = parseInt(this.getAttribute('index-element'));
                
                _this.change_icon(element_image, index_column, index_element);

            });

            L.DomEvent.on(element_delete, 'click', function(){

                this.disabled = true;

                const index_column = parseInt(this.getAttribute('index-column'));

                const index_element = parseInt(this.getAttribute('index-element'));

                delete self.columns[index_column].elements[index_element];

                self.columns[index_column].elements = self.columns[index_column].elements.flat();

                self.modal_message("Elemento eliminado con éxito.");

                window.setTimeout(function() {

                    self.legend_btn_save_legend.click();

                }, 3000);

                window.setTimeout(function(){

                    L.DomUtil.remove(column);

                }, 500);

                const elements_list = div_column.querySelectorAll('.div-elements');

                for (let x = 0; x < elements_list.length; x++) {

                    elements_list[x].children[1].setAttribute('index-element', x);
                    elements_list[x].children[2].setAttribute('index-element', x);
                    elements_list[x].children[3].setAttribute('index-element', x);

                }

            });  
        }
    }

    L.DomEvent.on(self.legend_btn_add_column, 'click', function(){

        let index_column;

        if (self.columns.length === 3) {

            self.modal_message("El número máximo de columnas permitidas son 3");

            return;

        }

        if (self.columns.length === 0) {

        self.columns[0] = {

            "name": "",
            "elements": []

        };

        index_column = 0;

        } else {

            self.columns[self.columns.length] = {

                "name": "",
                "elements": []
            };

            index_column = self.columns.length-1;

        }

        const div = L.DomUtil.create('div');
        div.style.borderTop = '1px solid #1ACBED';
        div.setAttribute('class', 'div-column');

        const div_container_1 = L.DomUtil.create('div');
        div_container_1.setAttribute('class', 'special-tools-container special-tools-div-33');

        const input_column_span = L.DomUtil.create('span');

        self.tool.google_translate({

            element_html: input_column_span,
            str: 'Columna:', 
            lang: self.lang

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

        self.tool.google_translate({

            element_html: btn_column_add_element,
            str: 'Añadir elemento', 
            lang: self.lang

        });

        const btn_column_delete = L.DomUtil.create('button');
        btn_column_delete.setAttribute('class', 'special-tools-btn-danger');
        btn_column_delete.setAttribute('index-column', index_column);

        self.tool.google_translate({

            element_html: btn_column_delete,
            str: 'Eliminar columna', 
            lang: self.lang

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

        self.columns_div.appendChild(div);

        L.DomEvent.on(btn_column_delete, 'click', function(){

            this.disabled = true;

            const index_column = this.getAttribute('index-column');

            delete self.columns[parseInt(index_column)];

            self.columns = self.columns.flat();

            self.modal_message("Columna eliminada con éxito.");

            window.setTimeout(function() {

                self.legend_btn_save_legend.click();

            }, 3000);

            window.setTimeout(function(){

                L.DomUtil.remove(div);

            }, 500);

            const columns_list = self.columns_div.querySelectorAll('.div-column');

            for (let x = 0; x < columns_list.length; x++) {

                columns_list[x].children[0].querySelector('input').setAttribute('index-column', x);
                columns_list[x].children[1].querySelectorAll('button')[0].setAttribute('index-column', x);
                columns_list[x].children[1].querySelectorAll('button')[1].setAttribute('index-column', x);

                const elements_list = columns_list[x].children[2].querySelectorAll('.div-elements');

                for (let y = 0; y < elements_list.length; y++) {

                    elements_list[y].children[1].setAttribute('index-column', x);
                    elements_list[y].children[2].setAttribute('index-column', x);
                    elements_list[y].children[3].setAttribute('index-column', x);

                }

            } 

        });

        L.DomEvent.on(input_column, 'keyup', function(){

            this.setAttribute('value', this.value);

            const index_column = this.getAttribute('index-column')

            self.columns[parseInt(index_column)].name = self.strip_tags(this.value);

        });

        L.DomEvent.on(input_column, 'focusout', function(){

            self.legend_btn_save_legend.click();

        });

        L.DomEvent.on(btn_column_add_element, 'click', function(){

            const index_column = parseInt(this.getAttribute('index-column'));
            let index_element;

            if (self.columns[index_column].elements.length === 0) {

                self.columns[index_column].elements[0] = {

                    "name": "",
                    "icon": self.tool.tool_url() + '/img/pin.svg'

                };

                index_element = 0;

            } else {

                self.columns[parseInt(index_column)].elements[self.columns[parseInt(index_column)].elements.length] = {

                    "name": "",
                    "icon": self.tool.tool_url() + '/img/pin.svg'

                };

               index_element = self.columns[index_column].elements.length-1;

            }

            const column = L.DomUtil.create('div');
            column.setAttribute('class', 'special-tools-container div-elements');

            const element_name_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: element_name_span,
                str: 'Elemento:', 
                lang: self.lang

            });

            const element_name = L.DomUtil.create('input');
            element_name.type = 'text';
            element_name.setAttribute('class', 'special-tools-input-150');
            element_name.setAttribute('index-column', index_column);
            element_name.setAttribute('index-element', index_element);

            const element_icon_button = L.DomUtil.create('button');
            element_icon_button.type = 'button';
            element_icon_button.setAttribute('class', 'special-tools-btn-default');
            element_icon_button.setAttribute('index-column', index_column);
            element_icon_button.setAttribute('index-element', index_element);
            
            self.tool.google_translate({

                element_html: element_icon_button,
                str: 'Subir icono',
                lang: self.lang

            });
            
            self.tool.google_translate({
                
                element_html: element_icon_button,
                str: 'Tamaño recomendado 36x36',
                lang: self.lang,
                attribute: 'title'
                
            });

            const element_image = L.DomUtil.create('img');
            element_image.src = self.tool.tool_url() + '/img/pin.svg';
            element_image.width = 18;
            element_image.height = 18;

            const element_delete = L.DomUtil.create('button');
            element_delete.innerHTML = "<img width='14' height='14' src='" + self.tool.tool_url() + "/img/trash.png'>";
            element_delete.style.marginLeft = '6px';
            element_delete.setAttribute('class', 'special-tools-btn-danger');
            element_delete.setAttribute('index-column', index_column);
            element_delete.setAttribute('index-element', index_element);

            column.appendChild(element_name_span);
            column.appendChild(element_name);
            column.appendChild(element_icon_button);
            column.appendChild(element_image);
            column.appendChild(element_delete);

            div_column.appendChild(column);

            self.modal_message("Elemento creado con éxito.");

            window.setTimeout(function() {

                self.legend_btn_save_legend.click();

            }, 3000);

            L.DomEvent.on(element_name, 'keyup', function() {

                this.setAttribute('value', this.value);

                const index_column = parseInt(this.getAttribute('index-column'));
                const index_element = parseInt(this.getAttribute('index-element'));

                self.columns[index_column].elements[index_element].name = self.strip_tags(this.value);

            });

            L.DomEvent.on(element_name, 'focusout', function() {

                self.modal_message("Elemento guardado con éxito.");

                window.setTimeout(function() {

                    self.legend_btn_save_legend.click();

                }, 3000);

            });

            L.DomEvent.on(element_icon_button, 'click', function() {

                const index_column = parseInt(this.getAttribute('index-column'));
                const index_element = parseInt(this.getAttribute('index-element'));

                _this.change_icon(element_image, index_column, index_element);

            });


            L.DomEvent.on(element_delete, 'click', function(){

                const index_column = parseInt(this.getAttribute('index-column'));

                const index_element = parseInt(this.getAttribute('index-element'));

                delete self.columns[index_column].elements[index_element];

                self.columns[index_column].elements = self.columns[index_column].elements.flat();

                self.modal_message("Elemento eliminado con éxito.");

                window.setTimeout(function() {

                    self.legend_btn_save_legend.click();

                }, 3000);

                window.setTimeout(function(){

                    L.DomUtil.remove(column);

                }, 500);

                const elements_list = div_column.querySelectorAll('.div-elements');

                for (let x = 0; x < elements_list.length; x++) {

                    elements_list[x].children[1].setAttribute('index-element', x);
                    elements_list[x].children[2].setAttribute('index-element', x);
                    elements_list[x].children[3].setAttribute('index-element', x);

                }

            });

        });

        self.modal_message("Columna creada con éxito");

        window.setTimeout(function() {

            self.legend_btn_save_legend.click();

        }, 3000);

    });

    
};

special_tools_legend.prototype.change_icon = function(element, index_column, index_element) {
    
    const self = this.special_tools;
    const _this = this;

    /**********************************************************************/

    const modal_image = L.DomUtil.create('div');
    modal_image.id = 'modal_image';
    modal_image.setAttribute('class', 'special-tools-modal-upload');

    self.map._container.append(modal_image);

    /**********************************************************************/

    const modal_image_container = L.DomUtil.create('div');
    modal_image_container.setAttribute('class', 'special-tools-modal-container');
    modal_image.appendChild(modal_image_container);

    /**********************************************************************/

    L.DomEvent.on(modal_image, 'mouseover', function() {

        self.map.dragging.disable();
        self.map.doubleClickZoom.disable();
        document.querySelector('.map_inputs').style.zIndex = 0;

    });

    /**********************************************************************/

    L.DomEvent.on(modal_image, 'mouseout', function() {

        self.map.dragging.enable();
        self.map.doubleClickZoom.enable();

    });

    /**********************************************************************/

    const title_image = L.DomUtil.create('div');
    title_image.setAttribute('class', 'special-tools-h2');

    self.tool.google_translate({

        element_html: title_image,
        str: "Subir icono", 
        lang: self.lang

    });

    modal_image_container.appendChild(title_image);

    /**********************************************************************/

    const container_image = L.DomUtil.create('div');
    modal_image_container.appendChild(container_image);

    /**********************************************************************/

    var br = L.DomUtil.create('br');
    modal_image_container.appendChild(br);

    /**********************************************************************/

    const btn_cancel_image = L.DomUtil.create('button');
    btn_cancel_image.setAttribute('class', 'special-tools-btn-default');

    self.tool.google_translate({

       element_html: btn_cancel_image,
       str: "Cancelar", 
       lang: self.lang

    });

    modal_image_container.appendChild(btn_cancel_image);

    /**********************************************************************/

    L.DomEvent.on(btn_cancel_image, 'click', function() {

        window.setTimeout(function() {

            modal_image.remove();

            self.map.dragging.enable();
            self.map.doubleClickZoom.enable();

            document.querySelector('.map_inputs').style.zIndex = 1;

        }, 100);

    });

    /**********************************************************************/

    self.tool.image_service_upload(container_image, ['jpg', 'jpeg', 'png'])
    .then(function() {
        self.tool.image_subscribe(
            function(response) {

                const options = {

                    file_data: response.file_data,
                    tipo: self.tool.get_component_image().tipo,
                    section_tipo: self.tool.get_component_image().section_tipo,
                    section_id: self.tool.get_component_image().section_id,
                    default_quality: self.tool.get_component_image().context.features.default_target_quality

                };

                self.tool.get_image_data(options).then(function(data) {

                    if (!data.success) {

                        self.modal_message('Ha ocurrido un error al subir el archivo');
                        return;

                    }

                    //data.image_src

                    self.columns[index_column].elements[index_element].icon = self.tool.base_url() + data.image_src;
                    element.src = self.tool.base_url() + data.image_src;

                    self.modal_message("Icono subido correctamente.");
                    
                    self.legend_btn_save_legend.click();

                    window.setTimeout(function() {

                        self.map.dragging.enable();
                        self.map.doubleClickZoom.enable();

                        self.map._container.querySelector('#modal_image').remove();

                        document.querySelector('.map_inputs').style.zIndex = 1;

                    }, 100);

                });

            }
        );
    });
    
};


