.section code

dat = 1

; word $7FFF

mem:

test:   move.l  d0,d1
        move.l  d1,d2
        rts

; a0,d0 - 00000000
; a0,d1 - 00010000
; a0,d2 - 00100000
; a0,d3 - 00110000
; a0,d4 - 01000000
; a0,d5 - 01010000
; a0,d6 - 01100000
; a0,d7 - 01110000
; a0,a0 - 10000000
; a0,a1 - 10010000



.section data
        dc.b 255