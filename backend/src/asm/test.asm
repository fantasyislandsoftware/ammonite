.section code

test:   move.l d0,d1
        bra test

.section data
        dc.b 255