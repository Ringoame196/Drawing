const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;  // 幅を設定
canvas.height = 400; // 高さも幅と同じにする

let drawing = false;
let color = "#000000";  // 初期色を黒に設定
let previousColor = "#ffffff"; // 初期の前の色を白に設定

const currentColorButton = document.getElementById('currentColor');
const previousColorButton = document.getElementById('previousColor');
const colorPalette = document.getElementById('colorPalette');
const showPaletteButton = document.getElementById('showPaletteButton');
const title = document.getElementById('title');
const author = document.getElementById('author');

// キャンバスの背景を白で塗りつぶす関数
function fillBackground() {
    ctx.fillStyle = '#FFFFFF';  // 背景色を白に設定
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // キャンバス全体を塗りつぶす
}

// 初期化時に背景を白で塗りつぶす
fillBackground();

// イベントリスナーで描画を開始・終了
canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;

    let color = document.getElementById('codeInput').value; // 初期色を黒に設定
    let lineWidth = Number(document.getElementById('characterThickness').value); // 選択した太さを取得

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    currentColorButton.style.backgroundColor = color; // 現在の色を更新

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// 色ボタンのクリックイベント
document.querySelectorAll('.colorButton').forEach(button => {
    button.addEventListener('click', () => {
        color = button.dataset.color;
        if (color !== undefined) {
            currentColorButton.style.backgroundColor = color; // 現在の色を更新
            document.getElementById('codeInput').value = color;
        }
    });
});

// カスタムカラーの選択イベント
const customColorInput = document.getElementById('customColor');
customColorInput.addEventListener('input', () => {
    const color = customColorInput.value;
    currentColorButton.style.backgroundColor = color; // 現在の色を更新
    document.getElementById('codeInput').value = color;
});

// カラーパレットの表示/非表示を切り替える
showPaletteButton.addEventListener('click', () => {
    if (colorPalette.style.display === 'none') {
        colorPalette.style.display = 'flex';
    } else {
        colorPalette.style.display = 'none';
    }
});

// クリアボタンのクリックイベント
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
    fillBackground(); // 背景を白で塗りつぶす
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillBackground(); // 再度白で塗りつぶす
});

// ダウンロードボタンのクリックイベント
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', () => {

    // キャンバスをPNG画像データに変換
    const image = canvas.toDataURL('image/png');
    
    // リンク要素を作成してクリックイベントをトリガー
    const link = document.createElement('a');
    link.href = image;
    link.download = title.value + ".png" || 'drawing.png';  // ダウンロード時のファイル名
    link.click();
});