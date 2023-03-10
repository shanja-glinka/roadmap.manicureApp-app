class ModalAlbumAnimation extends AnimationSctruct {

    constructor() {
        super();

        this.setStyles({
            stickerImgBox: 'sticker-img-box',
            stikerPadding: 'sticker-padding',

            cloneAlbumContainer: 'clone-album-container',

        });
    }


    // DONT TOUCH - tce zalupa, yebet
    infoCardAnimateIn(element) {

        let imgs = element.querySelectorAll('.' + this.styles.stickerImgBox);

        if (imgs.length == 0)
            imgs = element.querySelectorAll('.' + this.styles.stikerPadding);



        let modalWrap = document.querySelector('.' + this.styles.modalWrap);
        let animateElment = modalWrap.querySelectorAll('.' + this.styles.modalAlbumLayer + ' .' + this.styles.modalPhoto);


        let infoCardAnimate = document.querySelector('.' + this.styles.modalInfoCard);
        if (!infoCardAnimate)
            infoCardAnimate = null;



        let clonnedNodesContainer = _doc.createElement('div', { class: this.styles.cloneAlbumContainer });
        let clonnedNodes = [];
        let originalPosition = [];



        animateElment.forEach((el, index) => {

            if (index > 3)
                return;

            clonnedNodes.push(el.cloneNode(true));

            let rect = this.getBoundingClientRect(el);
            let rotation = this.getCurrentRotation(el) + 'deg';


            if (index == 0)
                _doc.addStyles(el, { transform: 'translateX(-40%) translateY(44%) rotate(0deg)' });
            if (index == 1)
                _doc.addStyles(el, { transform: 'translateX(40%) translateY(-41%) rotate(0deg)' });
            if (index == 2)
                _doc.addStyles(el, { transform: 'translateX(-40%) translateY(-40%) rotate(0deg)' });
            if (index == 3)
                _doc.addStyles(el, { transform: 'translateX(40%) translateY(40%) rotate(0deg)' });

            let rect1 = this.getBoundingClientRect(el);

            originalPosition[index] = rect1;
            originalPosition[index].rotation = rotation;
            originalPosition[index].width = this.getBoundingClientRect(el.parentNode).width;
            originalPosition[index].height = this.getBoundingClientRect(el.parentNode).height;

            _doc.removeStyles(el, 'transform');

            clonnedNodesContainer.appendChild(clonnedNodes[index]);
        });

        animateElment.forEach((el, index) => {
            // imgs.forEach((el, index) => {

            let imgsIndex = (typeof imgs[index] === 'undefined' ? imgs[0] : imgs[index]);

            let viewportOffset = imgsIndex.getBoundingClientRect();
            let rotation = this.getCurrentRotation(imgsIndex) + 'deg';

            if (typeof clonnedNodes[index] === 'undefined')
                index = 0;

            _doc.addStyles(clonnedNodes[index], {
                position: 'fixed',
                width: viewportOffset.width + 'px',
                height: viewportOffset.height + 'px',
                transition: '0s',
                left: '0px',
                top: '0px',
                opacity: 1,
                overflow: 'none',
                transform: 'translate(' + viewportOffset.x + 'px, ' + viewportOffset.y + 'px) rotate(' + rotation + ')',
                zIndex: (index > 2 ? 11 : 10 - index)
            });

            if (typeof imgs[index] !== 'undefined')
                _doc.addStyles(imgs[index], { opacity: 0 });
        });


        if (infoCardAnimate) {
            _doc.addStyles(infoCardAnimate, { display: 'none' });
            _doc.removeStyles(infoCardAnimate, 'transition');
        }


        modalWrap.appendChild(clonnedNodesContainer);


        setTimeout(() => {
            if (infoCardAnimate) {
                _doc.addStyles(infoCardAnimate, { opacity: 1 });
                _doc.removeStyles(infoCardAnimate, 'display');
            }

            clonnedNodes.forEach((el, index) => {
                let transitonProp = (index == 0 ? 'transform .5s ease-in-out' : (index == 1 ? 'transform .55s ease' : (index == 2 ? 'transform .4s ease-in' : 'transform .46s ease-in-out')));

                _doc.addStyles(el, {
                    width: originalPosition[index].width + 'px',
                    height: originalPosition[index].height + 'px',

                    transition: transitonProp,

                    transform: 'translate(' + originalPosition[index].x + 'px, ' + originalPosition[index].y + 'px) rotate(' + originalPosition[index].rotation + ')'
                });
            })
        }, 100);


        setTimeout(() => {
            _doc.addStyles(animateElment, { opacity: 1 });

            modalWrap.removeChild(clonnedNodesContainer);
        }, 600);

    }

    infoCardAnimateOut(element) {

        let imgs = element.querySelectorAll('.' + this.styles.stickerImgBox);

        if (imgs.length == 0)
            imgs = element.querySelectorAll('.' + this.styles.stikerPadding);



        let modalWrap = document.querySelector('.' + this.styles.modalWrap);
        let animateElment = modalWrap.querySelectorAll('.' + this.styles.modalAlbumLayer + ' .' + this.styles.modalPhoto);


        let infoCardAnimate = document.querySelector('.' + this.styles.modalInfoCard);
        if (infoCardAnimate) {
            _doc.addStyles(infoCardAnimate, { transform: 'translateX(35%) translateY(250%)' });

            setTimeout(() => {
                _doc.addStyles(infoCardAnimate, { display: 'none' });
            }, 500);
        }




        let clonnedNodesContainer = _doc.createElement('div', { class: this.styles.cloneAlbumContainer });
        let clonnedNodes = [];
        let originalPosition = [];


        modalWrap.appendChild(clonnedNodesContainer);


        animateElment.forEach((el, index) => {

            if (index > 3)
                return;


            clonnedNodes.push(el.cloneNode(true));

            let rotation = this.getCurrentRotation(el) + 'deg';


            _doc.addStyles(el, {
                transition: '0s',
                opacity: 0
            });

            if (index == 0)
                _doc.addStyles(el, { transform: 'translateX(-40%) translateY(44%) rotate(0deg)' });
            if (index == 1)
                _doc.addStyles(el, { transform: 'translateX(40%) translateY(-41%) rotate(0deg)' });
            if (index == 2)
                _doc.addStyles(el, { transform: 'translateX(-40%) translateY(-40%) rotate(0deg)' });
            if (index == 3)
                _doc.addStyles(el, { transform: 'translateX(-40%) translateY(-40%) rotate(0deg)' });


            let viewportOffset = el.getBoundingClientRect();

            _doc.addStyles(clonnedNodes[index], {
                position: 'fixed',
                width: this.getBoundingClientRect(el.parentNode).width + 'px',
                height: this.getBoundingClientRect(el.parentNode).height + 'px',
                transition: '0s',
                left: '0px',
                top: '0px',
                opacity: 1,
                overflow: 'none',
                transform: 'translate(' + viewportOffset.x + 'px, ' + viewportOffset.y + 'px) rotate(' + rotation + ')',
                zIndex: 10 - index
            });

            clonnedNodesContainer.appendChild(clonnedNodes[index]);
        });


        // setTimeout(() => {
        clonnedNodes.forEach((el, index) => {

            // imgs.forEach((el, index) => {

            if (typeof imgs[index] === 'undefined')
                index = 0;

            let viewportOffset = imgs[index].getBoundingClientRect();
            let rotation = this.getCurrentRotation(imgs[index]) + 'deg';

            let transitonProp = (index == 0 ? 'transform .5s ease-in-out' : (index == 1 ? 'transform .55s ease' : (index == 2 ? 'transform .4s ease-in' : 'transform .46s ease-in-out')));

            _doc.addStyles(el, {
                transition: transitonProp,

                width: viewportOffset.width + 'px',
                height: viewportOffset.height + 'px',
                opacity: 1,


                transform: 'translate(' + viewportOffset.x + 'px, ' + viewportOffset.y + 'px) rotate(' + rotation + ')'
            });

        })
        // }, 50);

        setTimeout(() => {
            _doc.addStyles(animateElment, { opacity: 0 });

            imgs.forEach((el, index) => {
                _doc.addStyles(el, { opacity: 1 });
            });

            modalWrap.removeChild(clonnedNodesContainer);

        }, 600);



    }

}