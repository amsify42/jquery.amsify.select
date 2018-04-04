(function($) {

    $.fn.amsifySelect = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type        : 'bootstrap',
            labelLimit  : 5,
            limit       : 50,
        }, options);

        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifySelect = function() {
           this.select        = null;
           this.name          = null;
           this.defaultLabel  = 'Select';
           this.classes       = {
              selectArea  : '.amsify-selection-area',
              labelArea   : '.amsify-selection-label',
              label       : '.amsify-label',
              toggle      : '.amsify-toggle-selection',
              listArea    : '.amsify-selection-list',
              searchArea  : '.amsify-select-search-area',
              search      : '.amsify-selection-search',
              list        : '.amsify-list',
              listItem    : '.amsify-list-item',
              inputType   : '.amsify-select-input',
              operations  : '.amsify-select-operations',
              clear       : '.amsify-select-clear',
           };
           this.selectors     = {
              selectArea  : null,
              labelArea   : null,
              label       : null,
              toggle      : null,
              listArea    : null,
              searchArea  : null,
              search      : null,
              list        : null,
              operations  : null,
              clear       : null,
           };
           this.selectionArea = '.amsify-selection-area';
           this.options       = [];
           this.isMultiple    = false;
        };


        AmsifySelect.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             */
            _init : function(selector) {
                this.select = selector;
                this.name   = ($(selector).attr('name'))? $(selector).attr('name')+'_amsify': 'amsify_selection';
                this.extractData();
                this.createHTML();
                this.setEvents();
                $(this.select).hide();
            },

            extractData : function() {
              var _self = this;
              this.isMultiple = ($(this.select).prop('multiple'))? true : false;
              $(this.select).find('option').each(function(index, option){
                  _self.options.push({
                                      value     : $(option).val(),
                                      label     : $(option).text(),
                                      selected  : (!index)? 1 : 0
                                  });
              });
            }, 

            createHTML : function() {
              var HTML                  = '<div class="'+this.classes.selectArea.substring(1)+'"></div>';
              this.selectors.selectArea = $(HTML).insertAfter(this.select);
              var labelHTML             = '<div class="'+this.classes.labelArea.substring(1)+'"></div>';
              this.selectors.labelArea  = $(labelHTML).appendTo(this.selectors.selectArea);

              this.defaultLabel         = (this.options[0].value)? this.defaultLabel: this.options[0].label;
              var label                 = '<div class="'+this.classes.label.substring(1)+'">'+this.defaultLabel+'</div>';
              this.selectors.label      = $(label).appendTo(this.selectors.labelArea);
              this.selectors.toggle     = $(this.toggleIcon()).appendTo(this.selectors.labelArea);

              var listArea              = '<div class="'+this.classes.listArea.substring(1)+'"></div>';
              this.selectors.listArea   = $(listArea).appendTo(this.selectors.selectArea);
              $(this.selectors.listArea).width($(this.selectors.selectArea).width()-3);

              var searchArea            = '<div class="'+this.classes.searchArea.substring(1)+'"></div>';
              this.selectors.searchArea = $(searchArea).appendTo(this.selectors.listArea);

              var search                = '<input type="text" class="'+this.classes.search.substring(1)+'" placeholder="Search here..."/>';
              this.selectors.search      = $(search).appendTo(this.selectors.searchArea);

              var list                  = '<ul class="'+this.classes.list.substring(1)+'"></ul>';
              this.selectors.list       = $(list).appendTo(this.selectors.listArea);

              var operations            = '<div class="'+this.classes.operations.substring(1)+'"></div>';
              this.selectors.operations = $(operations).appendTo(this.selectors.listArea);

              var clear                 = '<button class="'+this.classes.clear.substring(1)+'">Clear</button>';
              this.selectors.clear      = $(clear).appendTo(this.selectors.operations);
              $(this.createList()).appendTo(this.selectors.list);
            },            

            setEvents : function() {
              var _self = this;
              $(this.selectors.labelArea).attr('style', $(this.select).attr('style'))
                                         .addClass($(this.select).attr('class'));
              $(this.selectors.labelArea).click(function(){
                  $(this).parent().find(_self.classes.listArea).toggle();
              });
              $(this.selectors.list).find(this.classes.listItem).click(function(){
                $input      = $(this).find(_self.classes.inputType);
                var checked = ($input.is(':checked'))? false: true;
                $input.prop('checked', checked);
                var values  = $('input[name="'+_self.name+'"]:checked').map(function(){
                    return $(this).val();
                }).get();
                if(values.length > settings.limit) { 
                  alert('You cannot select more than '+settings.limit); 
                  $input.prop('checked', false);
                  return;
                };
                _self.setValue(values);
              });
              $(this.selectors.search).keyup(function(){
                var value = $.trim($(this).val().toLowerCase());
                _self.filterList(value);
              });
              $(this.selectors.clear).click(function(){
                _self.clearInputs();
              });
              $(window).resize(function(){
                $(_self.selectors.listArea).width($(_self.selectors.selectArea).width()-3);
              });
            },

            setValue : function(values) {
              var _self   = this;
              $(this.select).find('option').attr('selected', false);
              var label = (values.length)? '' : this.defaultLabel+', ';
              $.each(this.options, function(index, option){
                if($.inArray(option.value, values) !== -1) {
                  label += option.label+', ';
                  $(_self.select).find('[value="'+option.value+'"]').attr('selected', true);
                }
              });
              label = (values.length >= settings.labelLimit)? values.length+' selected': label.slice(0, -2);
              $(this.selectors.label).text(label);
              console.info($(this.select).val());
            },

            toggleIcon : function(type) {
                return '<span class="'+this.classes.toggle.substring(1)+' fa fa-chevron-down"></span>';
            },

            createList : function() {
              var _self     = this;
              var listHTML  = '';
              $.each(this.options, function(index, option){
                if(index) {
                  listHTML += '<li class="'+_self.classes.listItem.substring(1)+'">'+_self.getInputType(option.value)+' '+option.label+'</li>';
                }
              });
              return listHTML;
            },

            getInputType : function(value) {
              var type        = (this.isMultiple)? 'checkbox': 'radio';
              var inputClass  = this.classes.inputType.substring(1);
              return '<input type="'+type+'" name="'+this.name+'" class="'+inputClass+'" value="'+value+'"/>';
            },

            filterList : function(value) {
              $(this.selectors.list).find(this.classes.listItem).each(function(){
                if(~$(this).text().toLowerCase().indexOf(value)) {
                  $(this).show();
                } else {
                  $(this).hide();
                }
              });
            },

            clearInputs : function() {
              $(this.select).find(':selected').attr('selected', false);
              $(this.selectors.list).find(this.classes.inputType).prop('checked', false);
              $(this.selectors.label).text(this.defaultLabel);
              $(this.selectors.search).val('');
              this.filterList('');
            },
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifySelect)._init(this);
        });

    };

}(jQuery));