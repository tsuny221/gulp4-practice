const { src, dest } = require("gulp");
//{src, dest} gulpでやるよりこの方が記述がsrcのみでOK
const rename = require("gulp-rename"); //ファイル名を変更する

function copyFiles() {
  return src("./src/index.html")
    .pipe(
      rename({
        prefix: "hello-",
      })
    )
    .pipe(dest("./dist"));
}

exports.copyFiles = copyFiles;

//distにファイルがコピーされる配列で複数のファイル、フォルダに指定も可能
//"./src/*"ワイルドカードでフォルダ内のもの全てコピーも可能
//"./src/*.html"htmlのみ全てコピーも可能
//フォルダのコピーの場合、"./src/**"でフォルダ構造を再起的に辿る。フォルダだけでなく中身も一緒にコピー
