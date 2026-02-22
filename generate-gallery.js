#!/usr/bin/env node
/**
 * generate-gallery.js
 * assets/images/gallery/photo/ と assets/images/gallery/illust/ を自動スキャンして
 * gallery-data.json を生成するスクリプト。
 *
 * 使い方：
 *   node generate-gallery.js
 *
 * 対応フォーマット：.png .jpg .jpeg .webp .gif
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'assets/images/gallery');
const OUT  = path.join(__dirname, 'gallery-data.json');
const EXTS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

/** ファイル名 → ラベル変換（拡張子除去・ハイフン/アンダースコア→スペース） */
function toLabel(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function scanTab(tab) {
  const dir = path.join(BASE, tab);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => EXTS.includes(path.extname(f).toLowerCase()))
    .sort()
    .map(f => ({
      src:   `assets/images/gallery/${tab}/${f}`,
      label: toLabel(f),
      tab
    }));
}

const items = [
  ...scanTab('photo'),
  ...scanTab('illust')
];

fs.writeFileSync(OUT, JSON.stringify({ items }, null, 2), 'utf8');
console.log(`gallery-data.json を生成しました（photo: ${items.filter(i=>i.tab==='photo').length}枚 / illust: ${items.filter(i=>i.tab==='illust').length}枚）`);
