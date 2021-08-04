/*
 * @IDE      : WebStorm
 * @time     : 2021/3/5 17:45
 * @author   : 李艳鹏
 * @Software : app
 * @File     : mWatermark
 * @describe :
*/


export default (el, binding) => {
    function addWaterMarker(str, parentNode, font, textColor) {// 水印文字，父元素，字体，文字颜色
        const can = document.createElement('canvas');
        parentNode.appendChild(can);
        can.width = 550;
        can.height = 540;
        can.style.display = 'none';
        const cans = can.getContext('2d');
        cans.rotate(-20 * Math.PI / 180);
        cans.font = font || "30px Arial";
        cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
        cans.textAlign = 'left';
        cans.fillText(str, can.width / 4, can.height / 3);
        parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
    }

    const {username, phone} = binding.value.userInfo
    addWaterMarker(`${username}-${phone}`, el, binding.value.font, binding.value.textColor)
}
