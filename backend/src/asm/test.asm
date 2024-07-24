.section code

test:   move.b d0,100
        bra test

.section data
        dc.b 255