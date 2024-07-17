.section code

test:   move.b d1,0
        move.b d0,d1
        bra test

.section data
        dc.b 255