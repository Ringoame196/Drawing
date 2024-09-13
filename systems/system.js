const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;  // 幅を設定
canvas.height = 400; // 高さも幅と同じにする

let drawing = false;
let color = "#000000";  // 初期色を黒に設定

const currentColorButton = document.getElementById('currentColor');
const colorPalette = document.getElementById('colorPalette');
const showPaletteButton = document.getElementById('showPaletteButton');
const title = document.getElementById('title');

// キャンバスの背景を白で塗りつぶす関数
function fillBackground() {
    ctx.fillStyle = '#FFFFFF';  // 背景色を白に設定
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // キャンバス全体を塗りつぶす
}

// 初期化時に背景を白で塗りつぶす
fillBackground();

// 描画を開始する関数
function startDrawing(event) {
    drawing = true;
    draw(event);
}

// 描画を終了する関数
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

// 描画を行う関数
function draw(event) {
    if (!drawing) return;

    event.preventDefault();  // デフォルトのタッチイベントを無効化

    let color = document.getElementById('codeInput').value; // 選択した色を取得
    let lineWidth = Number(document.getElementById('characterThickness').value); // 選択した太さを取得

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    currentColorButton.style.backgroundColor = color; // 現在の色を更新

    // タッチイベントの場合とマウスイベントの場合の位置計算
    const rect = canvas.getBoundingClientRect();
    const x = event.touches ? (event.touches[0].clientX - rect.left) : (event.clientX - rect.left);
    const y = event.touches ? (event.touches[0].clientY - rect.top) : (event.clientY - rect.top);

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// イベントリスナーを設定
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// タッチイベントに対応するイベントリスナー
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);

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
    colorPalette.style.display = colorPalette.style.display === 'none' ? 'flex' : 'none';
});

// クリアボタンのクリックイベント
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
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
