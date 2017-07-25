/**
* Plugin Authoring
*
* @author Will Angélico <willangelico@gmail.com>
*
**/

;(function($){

	"use strict"

	$.fn.WHorloge = function( params ) {

		// Default options
		var options = $.extend({
			getMounth 		: '.horloge-month',
			getDay 			: '.horloge-day',
			getHour 		: '.horloge-hour',
			getMinute 		: '.horloge-minute',
			getSecond 		: '.horloge-second',
			getMillisecond	: '.horloge-millisecond',
			getTime 		: 'yyyy-mm-dd-hh-min'
		}, params);

		// Plugin variables
		var $self	=	$(this);

		// Dom Elements
		var elements = {
			$window : $(window)
		};

		//Methods
		var methods = {
			init: function(){
				var time = methods.splitTime();				
				methods.updateCounter(time[0],time[1],time[2],time[3],time[4]);
			},
			splitTime: function(){
				var spTime = options.getTime.split('-');
				if( spTime[3] == undefined)
					spTime.push('23:59:59');
				return spTime;
			},
			updateCounter: function(_y,_m,_d,_h,_min){
				var _montharray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
				var _today		= new Date();
				var resetMillis	= false;

				var milliseconds = 1000;

				var _changeMilliseconds = function(){
					if (!resetMillis){
						milliseconds = milliseconds - 3;
						var $ms = $( options.getMillisecond, $self );
						if( $ms.length )
							$ms.html( milliseconds );
					}
				}

				var _changeTime = function(){
					var _today		= new Date();

					var _todayy = _today.getYear();
                    if (_todayy < 1000)
                        _todayy += 1900;

                    var _todaym = _today.getMonth();
                    var _todayd = _today.getDate();
                    var _todayh = _today.getHours();
                    var _todaymin = _today.getMinutes();
                    var _todaysec = _today.getSeconds();
                    if(_todaysec.length < 2){
                    	_todaysec = "0" + _todaysec;	
                    }
                    
                    var _todaystring = _montharray[_todaym] + " " + _todayd + ", " + _todayy + " " + _todayh + ":" + _todaymin + ":" + _todaysec;
                    var _futurestring = _montharray[_m - 1] + " " + _d + ", " + _y + " " + _h + ":" + _min;
                   

                    /* calculation of remaining days, hrs, min, and secs */

                    var _dd     = Date.parse(_futurestring) - Date.parse(_todaystring);
                    
                    var _dday   = Math.floor(_dd / (60 * 60 * 1000 * 24) * 1);
                    var _dhour  = Math.floor((_dd % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);

					var _dhourNotDay = ( Math.floor((_dd % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1) + _dday * 24 );

					var _dmin   = Math.floor(((_dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
                    var _dsec   = Math.floor((((_dd % (60 * 60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);
                    
                    milliseconds = 1000;

                    var $ss = $( options.getSecond, $self), 
                        $mm = $( options.getMinute, $self), 
                        $hh = $( options.getHour, $self), 
                        $dd = $( options.getDay, $self);

                    if( _dsec < 0 || _dmin < 0 || _dhour < 0 || _dday < 0 ){
                        _dsec = 0;
                        _dmin = 0;
                        _dhour = 0;
                        _dday = 0;
                        resetMillis = true;
                    }


                    if( $ss.length ){
                        $ss.html(_dsec);
                    }
                    if( $mm.length ){
                        $mm.html(_dmin);
                    }
                    if( $hh.length ){
                        $hh.html(_dhour);
                    }
                    if( $dd.length ){
                        $dd.html(_dday);
                    }                   
				};

				_changeTime();
         
                setInterval(_changeTime, 1000);
                setInterval(_changeMilliseconds, 1);
			}
		}

		// events
		var events = {
			// nothing
		};

		methods.init();
	};
})( jQuery );