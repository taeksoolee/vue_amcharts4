const BulletsAnimationStyle = {
    props: {
        'scaleStart': Number,
        'scaleEnd': Number,
        'opacityStart': Number,
        'opacityEnd': Number,
    },
    template: `
        <div></div>
    `,
    methods: {
        setStyle: function(bullet) {
            const eventList = [];

            if(this.scaleStart !== undefined && this.scaleEnd !== undefined) {
                eventList.push({ property: "scale", from: this.scaleStart, to: this.scaleEnd } );
            }

            if(this.opacityStart !== undefined && this.opacityEnd !== undefined) {
                eventList.push({ property: "opacity", from: this.opacityStart, to: this.opacityEnd });
            }
            
            const animateBullet = function() {
                if(eventList.length === 0) {
                    throw Error('BulletsAnimationStyle : vue component error : do set event !!')
                }

                const animation = bullet.animate(
                    eventList, 
                    1000, 
                    am4core.ease.circleOut // 설정할 수 있도록 추후 수정 예정
                );
    
                animation.events.on("animationended", function(event){
                    animateBullet(event.target.object);
                });    
            };

            animateBullet();
        }
    }
    
}