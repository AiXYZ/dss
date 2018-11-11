        var gridster = null;
        $(document).ready(function () {
            gridster = $(".gridster ul").gridster({
                widget_base_dimensions: ['auto', 72],
                autogenerate_stylesheet: true,
                min_cols: 1,
                max_cols: 128,
                max_rows: 10,
                shift_larger_widgets_down: false,
                avoid_overlapped_widgets: true,
                widget_margins: [0, 0],
                resize: {
                    enabled: true
                }
            }).data('gridster');
            $('.gridster  ul').css({'padding': '0', 'height': '600px', 'max-height': '600px', 'min-height': '600px'});
        });