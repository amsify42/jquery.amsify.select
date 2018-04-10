(function($) {

    $.fn.amsifySelect = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type        : 'bootstrap',
            labelLimit  : 5,
            limit       : 30,
            searchable  : false,
            classes     : {
              clear : '',
              close : '',
            },
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
              selectArea    : '.amsify-selection-area',
              labelArea     : '.amsify-selection-label',
              labelDefault  : '.amsify-selection-label-default',
              label         : '.amsify-label',
              toggle        : '.amsify-toggle-selection',
              listArea      : '.amsify-selection-list',
              searchArea    : '.amsify-select-search-area',
              search        : '.amsify-selection-search',
              list          : '.amsify-list',
              listGroup     : '.amsify-list-group',
              listItem      : '.amsify-list-item',
              itemPad       : '.amsify-item-pad',
              noResult      : '.amsify-item-noresult',
              inputType     : '.amsify-select-input',
              operations    : '.amsify-select-operations',
              clear         : '.amsify-select-clear',
              close         : '.amsify-select-close',
           };
           this.defaultClass  = {
              bootstrap : {
                clear : 'btn btn-default',
                close : 'btn btn-default',
              },
              materialize : {
                clear : 'btn waves-effect waves-light',
                close : 'btn waves-effect waves-light',
              },
              amsify : {
                clear : '',
                close : '',
              }
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
              close       : null,
           };
           this.selectionArea = '.amsify-selection-area';
           this.options       = [];
           this.selected      = [];
           this.isMultiple    = false;
           this.isOptGroup    = false;
           this.isSearchable  = false;
           this.clearClass    = null;
           this.closeClass    = null;
        };


        AmsifySelect.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             */
            _init : function(selector) {
                this.select       = selector;
                this.name         = ($(selector).attr('name'))? $(selector).attr('name')+'_amsify': 'amsify_selection';
                this.isSearchable = ($(selector).attr('searchable') !== undefined)? true: settings.searchable;
                this.clearClass   = (settings.classes.clear)? settings.classes.clear: this.defaultClass[settings.type].clear;
                this.closeClass   = (settings.classes.close)? settings.classes.close: this.defaultClass[settings.type].close;
                this.extractData();
                this.createHTML();
                this.setEvents();
                $(this.select).hide();
            },

            extractData : function() {
              var _self = this;
              this.isMultiple = ($(this.select).prop('multiple'))? true : false;
              this.isOptGroup = ($(this.select).find('optgroup').length)? true: false;

              if(this.isOptGroup) {
                $firstItem = $(this.select).find('option:first');
                if($firstItem.length) {
                  _self.options.push({
                                        type      : 'option',
                                        label     : $firstItem.text(),
                                    });
                }
                $(this.select).find('optgroup').each(function(index, optgroup){
                  _self.options.push({
                                        type      : 'optgroup',
                                        label     : $(optgroup).attr('label'),
                                    });
                  $(optgroup).find('option').each(function(okey, option){
                      _self.options.push({
                                          type      : 'option',
                                          value     : $(option).val(),
                                          label     : $(option).text(),
                                          selected  : ($(option).attr('selected') !== undefined)? 1 : 0
                                      });
                  });
                });
              } else {
                $(this.select).find('option').each(function(index, option){
                      _self.options.push({
                                          type      : 'option',
                                          value     : $(option).val(),
                                          label     : $(option).text(),
                                          selected  : ($(option).attr('selected') !== undefined)? 1 : 0
                                      });
                  });
              }
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

              /**
               * If searchable
               */
              if(this.isSearchable) {
                var searchArea            = '<div class="'+this.classes.searchArea.substring(1)+'"></div>';
                this.selectors.searchArea = $(searchArea).appendTo(this.selectors.listArea);

                var search                = '<input type="text" class="'+this.classes.search.substring(1)+'" placeholder="Search here..."/>';
                this.selectors.search     = $(search).appendTo(this.selectors.searchArea);
              }

              var list                  = '<ul class="'+this.classes.list.substring(1)+'"></ul>';
              this.selectors.list       = $(list).appendTo(this.selectors.listArea);

              var operations            = '<div class="'+this.classes.operations.substring(1)+'"></div>';
              this.selectors.operations = $(operations).appendTo(this.selectors.listArea);

              var clear                 = '<button class="'+this.classes.clear.substring(1)+' '+this.clearClass+'">Clear</button>';
              this.selectors.clear      = $(clear).appendTo(this.selectors.operations);

              var close                 = '<button class="'+this.classes.close.substring(1)+' '+this.closeClass+'">Close</button>';
              this.selectors.close      = $(close).appendTo(this.selectors.operations);
              $(this.createList()).appendTo(this.selectors.list);
              this.fixCSS();
            },            

            setEvents : function() {
              var _self = this;
              $(this.selectors.labelArea).attr('style', $(this.select).attr('style'))
                                         .addClass($(this.select).attr('class'));
              $(this.selectors.labelArea).click(function(e){
                e.stopPropagation();
                $this = $(this).parent().find(_self.classes.listArea);
                $(_self.classes.listArea).not($this).hide();
                $this.toggle();
              });
              $(document).click(function(e) {
                if(!$(e.target).hasClass(_self.classes.listItem.substring(1)) && !$(e.target).hasClass(_self.classes.clear.substring(1))) {
                  $(_self.selectors.listArea).hide();
                }
              });
              $(this.selectors.close).click(function(){
                 $(this).closest(_self.classes.listArea).hide(); 
              });
              $(this.selectors.list).find(this.classes.listItem).click(function(){
                $(_self.selectors.list).find(_self.classes.listItem).removeClass('active');
                $input      = $(this).find(_self.classes.inputType);
                var checked = ($input.is(':checked'))? false: true;
                $input.prop('checked', checked);
                var values  = $('input[name="'+_self.name+'"]:checked').map(function(){
                    return $(this).val();
                }).get();
                if(values.length > settings.limit) { 
                  alert('You cannot select more than '+settings.limit); 
                  $input.prop('checked', false);
                  $(this).removeClass('active');
                  return false;
                };
                _self.setValue(values);
              });
              /**
               * If searchable
               */
              if(this.isSearchable) {
                $(this.selectors.search).keyup(function(){
                  var value = $.trim($(this).val().toLowerCase());
                  _self.filterList(value);
                });
              }
              $(this.selectors.clear).click(function(){
                _self.clearInputs();
              });
              $(window).resize(function(){
                $(_self.selectors.listArea).width($(_self.selectors.selectArea).width()-3);
              });
              this.loadExisting();
            },

            loadExisting : function() {
              var _self = this;
              if(this.selected.length) {
                var selected  = false;
                $(this.selectors.list).find(this.classes.listItem).each(function(){
                    $input = $(this).find(_self.classes.inputType);
                    var isSelected = $.inArray($input.val(), _self.selected);
                    if((isSelected !== -1 && _self.isMultiple) || (isSelected !== -1 && !selected)) {
                      $input.prop('checked', true);
                      selected = true;
                    }
                });
                this.setValue(this.selected);
              }
            },

            setValue : function(values) {
              var _self   = this;
              $(this.select).find('option').attr('selected', false);
              var label = (values.length)? '' : this.defaultLabel+', ';
              $.each(this.options, function(index, option){
                if($.inArray(option.value, values) !== -1){
                  label += option.label+', ';
                  $(_self.select).find('[value="'+option.value+'"]').attr('selected', true);
                  $(_self.selectors.list).find(_self.classes.inputType).each(function(){
                      if($(this).is(':checked')) {
                        $(this).closest(_self.classes.listItem).addClass('active');
                      }
                  });
                  if(!_self.isMultiple) return false;
                }
              });
              label = (values.length >= settings.labelLimit)? values.length+' selected': label.slice(0, -2);
              $(this.selectors.label).text(label);
              console.info($(this.select).val());
            },

            toggleIcon : function() {
                if(settings.type == 'bootstrap') {
                  return '<span class="'+this.classes.toggle.substring(1)+' fa fa-chevron-down"></span>';
                } else if(settings.type == 'materialize') {
                  return '<i class="'+this.classes.toggle.substring(1)+' material-icons">arrow_drop_down</i>';
                } else {
                  $(this.selectors.labelArea).addClass(this.classes.labelDefault.substring(1));
                  return '<span class="'+this.classes.toggle.substring(1)+'">&#x25BC;</span>';
                }
            },

            createList : function() {
              var _self     = this;
              var listHTML  = '';
              var selected  = false;
              $.each(this.options, function(index, option){
                if(option.type == 'optgroup') {
                    listHTML += '<li class="'+_self.classes.listGroup.substring(1)+'">'+option.label+'</li>';
                } else if(option.value) {
                  var isActive  = ((option.selected && _self.isMultiple) || (option.selected && !selected))? 'active': '';
                  isActive     += (_self.isOptGroup)? ' '+_self.classes.itemPad.substring(1): '';
                  listHTML += '<li class="'+_self.classes.listItem.substring(1)+' '+isActive+'">'+_self.getInputType(option.value)+' '+option.label+'</li>';
                  if(option.selected) {
                    _self.selected.push(option.value);
                    selected = true;
                  }
                }
              });
              if(this.isSearchable) listHTML += '<li class="'+_self.classes.noResult.substring(1)+'">No matching options</li>';
              return listHTML;
            },

            getInputType : function(value) {
              var type        = (this.isMultiple)? 'checkbox': 'radio';
              var inputClass  = this.classes.inputType.substring(1);
              return '<input type="'+type+'" name="'+this.name+'" class="'+inputClass+'" value="'+value+'"/>';
            },

            filterList : function(value) {
              var _self = this;
              var found = false;
              $(this.selectors.list).find(this.classes.noResult).hide();
              if(this.isOptGroup) $(this.selectors.list).find(this.classes.listGroup).hide();
              $(this.selectors.list).find(this.classes.listItem).each(function(){
                if(~$(this).text().toLowerCase().indexOf(value)) {
                  $(this).show();
                  $(this).prevAll(_self.classes.listGroup+':first').show();
                  found = true;
                } else {
                  $(this).hide();
                }
              });
              if(!found) $(this.selectors.list).find(this.classes.noResult).show();
            },

            clearInputs : function() {
              $(this.select).find(':selected').attr('selected', false);
              $(this.selectors.list).find(this.classes.listItem).removeClass('active');
              $(this.selectors.list).find(this.classes.inputType).prop('checked', false);
              $(this.selectors.label).text(this.defaultLabel);
              /**
               * If searchable
               */
              if(this.isSearchable) {
                $(this.selectors.search).val('');
              }
              this.filterList('');
            },

            fixCSS : function() {
              if(settings.type == 'materialize') {
                $(this.selectors.labelArea).addClass(this.classes.labelDefault.substring(1)).css({'min-height': '36px', 'padding': '5px 5px'});
                $(this.selectors.searchArea).css('max-height', '46px');
                $(this.selectors.search).css('max-height', '28px');
              } else if(settings.type == 'bootstrap') {
                $(this.selectors.search).css('width', '100%');
              }
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