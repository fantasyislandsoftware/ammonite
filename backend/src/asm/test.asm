.section code

test:   move.b d0,(a0)+
        bra test

.section data
        dc.b 255