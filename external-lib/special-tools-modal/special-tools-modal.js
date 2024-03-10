const SpecialToolsModal = {

    create: function(map) {
        
        const self = this;
        
        this.leaflet_modal = document.createElement('div');
        this.leaflet_modal.classList.add('leaflet-modal');
        this.leaflet_modal.classList.add('hide');
        
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');
        
        this.leaflet_modal.appendChild(this.overlay);

        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        
        this.leaflet_modal.appendChild(this.modal);

        this.modal_content = document.createElement('div');
        this.modal_content.classList.add('modal-content');
        this.modal.appendChild(this.modal_content);

        this.span_close = document.createElement('span');
        this.span_close.classList.add('close');
        this.span_close.title = 'close';
        this.span_close.innerHTML = "&times;";
        this.modal_content.appendChild(this.span_close);
        
        this.span_close.addEventListener('click', function() {
            
            self.hide();
            
        });

        this.modal_inner = document.createElement('div');
        this.modal_inner.classList.add('modal-inner');
        this.modal_content.appendChild(this.modal_inner);

        this.modal_header = document.createElement('div');
        this.modal_header.classList.add('modal-header');
        this.modal_inner.appendChild(this.modal_header);

        this.modal_body = document.createElement('div');
        this.modal_body.classList.add('modal-body');
        this.modal_inner.appendChild(this.modal_body);

        this.modal_footer = document.createElement('div');
        this.modal_footer.classList.add('modal-footer');
        this.modal_inner.appendChild(this.modal_footer);
        
        map._container.appendChild(this.leaflet_modal);
        
    },

    show: function() {

        this.modal_header.innerHTML = '';
        this.modal_body.innerHTML = '';
        this.modal_footer.innerHTML = '';

        if (typeof callback === 'undefined') callback = '';  
        this.leaflet_modal.classList.remove('hide');
        this.leaflet_modal.classList.add('show');
        try {
        L.DomEvent
          .disableClickPropagation(this.leaflet_modal)
          .disableScrollPropagation(this.leaflet_modal);
        } catch(e){};
    },
    
    hide: function() {

        this.modal_header.innerHTML = '';
        this.modal_body.innerHTML = '';
        this.modal_footer.innerHTML = '';
        this.leaflet_modal.classList.remove('show');
        this.leaflet_modal.classList.add('hide');
    },

    getModal: function() {
        return this.leaflet_modal;
    },
    
    getContent: function() {
        return this.modal_content;
    },
    
    getHeader: function() {
        return this.modal_header;
    },
    
    getBody: function() {
        return this.modal_body;
    },
    
    getFooter: function() {
        return this.modal_footer;
    },
    
    getClose: function() {
        return this.span_close;
    }
    
};