#!/bin/sh

test -f /bin/router_functions && . /bin/router_functions
msg "Starting ppp/pptp/pppoe..."

test -r /etc/ppp/options || exit 0
test -x /usr/sbin/pppd || exit 0

LINK="cdma-mts"

# Link models:
# ppp:   inet-moxa inet-direct isdn-dialup
# gprs:  gprs-beeline gprs-djuice gprs-jeans gprs-ks gprs-ksab gprs-life gprs-umc gprs-megafon_ru gprs-beeline_ru
# cdma:  cdma-intertelecom cdma-mts cdma-peoplenet cdma-utel
# pptp:  lan-pptp lan-pptpd
# pppoe: adsl-ukrtel lan-pppoe

# Example string for ppptp: (wait 10 sec and start ppp):
# (while true ; do sleep 10 ; /usr/sbin/pppd call $LINK > /dev/null ; done) >/dev/null 2>&1 &
#
# Example string for pppoe: (wait 10 sec, up interface and start ppp):
# (while true ; do sleep 10 ; ip link set ethX up ; /usr/sbin/pppd call $LINK > /dev/null ; done) >/dev/null 2>&1 &
#
# Example string for serial modem (power reset, wait 10 sec and start ppp):
# (while true ; do /sbin/resetdev modem ; sleep 10 ; /usr/sbin/pppd call $LINK > /dev/null ; done) >/dev/null 2>&1 &
#
# Example string for usb modem (power reset, wait 10 sec, check USB device and start ppp):
# (while true ; do /sbin/resetdev usb ; sleep 10 ; test -c /dev/usb/tts/0 && /usr/sbin/pppd call $LINK > /dev/null ; done) >/dev/null 2>&1 &
(while true ; do /sbin/resetdev usb ; sleep 10 ; rmmod usbserial ; /etc/init.d/modem_init start ; sleep 20 ; insmod usbserial vendor=0x16d5 product=0x6502 ; test -c /dev/usb/tts/0 && /usr/sbin/pppd call $LINK > /dev/null ; done) >/dev/null 2>&1 &
#
# Example string for usb modem (power reset, wait 10 sec, init modem with internal flash, wait 10 sec, check USB device and start ppp):
# (while true ; do /sbin/resetdev usb ; sleep 10 ; /etc/init.d/modem_init start ; sleep 20 ; test -c /dev/usb/acm/0 && /usr/sbin/pppd call $LINK > /dev/null ; done) >/dev/null 2>&1 &
# (while true ; do /sbin/resetdev usb ; sleep 10 ; /etc/init.d/modem_init start ; sleep 20 ; test -c /dev/usb/tts/0 && /usr/sbin/pppd call $LINK > /dev/null ; done) >/dev/null 2>&1 &
