.section code

test:   move.l d0,0
        bra test

.section data
        dc.b 255