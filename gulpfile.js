const { src, dest } = require("gulp"); //{src, dest} gulpでやるよりこの方が記述がsrcのみでOK
const imagemin = require("gulp-imagemin");
const loadPlugins = require("gulp-load-plugins"); //まとめて読み込む方法
const $ = loadPlugins();
const pkg = require("./package.json");
const conf = pkg["gulp-config"];
const sizes = conf.sizes;
function icon(done) {
  //コールバック関数（for文ではreturnが使えないので）
  for (let size of sizes) {
    let width = size[0];
    let height = size[1];
    src("./favicon.png")
      .pipe(
        $.imageResize({
          width,
          height,
          crop: true,
          unscale: false,
        }) //サイズ変更
      )
      .pipe($.imagemin()) //画像圧縮
      .pipe($.rename(`favicon-${width}x${height}.png`))
      .pipe(dest("./dist/images/icon"));
  }
  done();
}
exports.icon = icon;

//distにファイルがコピーされる配列で複数のファイル、フォルダに指定も可能
//"./src/*"ワイルドカードでフォルダ内のもの全てコピーも可能
//"./src/*.html"htmlのみ全てコピーも可能
//フォルダのコピーの場合、"./src/**"でフォルダ構造を再起的に辿る。フォルダだけでなく中身も一緒にコピー
