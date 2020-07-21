import { OutputQuoteStyle } from "terser";

class Character {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.mp = props.mp;
    this.offensePower = props.offensePower;
    this.defencePower = props.defencePower;
  }

  showStatus() {
    /* 
      キャラクターの名前、HP、MPを表示する。
    */
    const main = document.getElementById('main');
    const div = document.createElement('div');
    div.innerHTML = `<p>キャラクター名:${this.name} HP: ${this.hp} MP:${this.mp}</p>`;
    main.appendChild(div);
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
    */
    const div = document.createElement('div');
    const main = document.getElementById('main');

    if (this.hp <= 0) {//キャラクターが死んでいる
      div.innerHTML = `${this.name}が死んでいて攻撃出来ない。`;
      main.appendChild(div);
      return;
    }

    if (defender.hp <= 0) {
      div.innerHTML = `${defender.name}が死んで攻撃出来ない。`;
      main.appendChild(div);
      return;
    }

    const damage = this.calcAttackDamage(defender);
    defender.hp = defender.hp - damage;

    if (defender.hp <= 0) {
      //自分のキャラクターが敵に○○ダメージを与えたので敵が死んだ。
      div.innerHTML = `${this.name}が${defender.name}に${damage}ダメージ を与えたので${defender.name}が死んだ。`;
      main.appendChild(div);
    } else {
      //自分のキャラクターが敵に○○ダメージを与えた。敵のHPは残り○○。
      div.innerHTML = `${this.name}が${defender.name}に${damage}ダメージを与えた。${defender.name}のHPは${defender.hp}。`
      main.appendChild(div);
    }
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */

    let damage = this.offensePower - defender.defencePower;

    if (damage <= 0) {
      //defender.hp = defender.hp - damage;
      damage = 1;
    }
    return damage;
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    /* 
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
   const div = document.createElement('div');
   const main = document.getElementById('main');


   //相手が死んでいる場合は回復が出来ないためその旨を表示する。
   // 引数がこちらはtargetに変わっていることに着目しましょう
   // defenderは引数として宣言されていませんのでここでは使用できません

    //魔法使いが死んでいる場合その旨を表示する。
   if (this.hp <= 0) {
      div.innerHTML = `${this.name}が死んでいるため、回復できない。`;
      main.appendChild(main);
      return;
   }

   //相手が死んでいる場合は回復が出来ないためその旨を表示する。
    if (target.hp <= 0) {
      div.innerHTML = `${target.name}が死んでいるため、回復できない。`;
      main.appendChild(main);
      return;
   } 

   if (this.mp <= 2) {
      //MPが足りない場合はその旨を表示する。
      div.innerHTML = `${this.name}がMPが足りないため回復できない。`;
      main.appendChild(main);
    } else {
      // 回復魔法は3のMPを消費する。相手のHPを15回復する。
      div.innerHTML = `${this.name}が回復魔法を使った。${target.name}のHPは15回復して${target.hp}になった。`;
      main.appendChild(main);
    }
  }

  // 計算が伴う実装の場合、まず計算を先にどう行うのかを考えてから、コードに移ると良いです
  // 「魔法使いの3MPを消費する」は、簡単な算数の式にするとどうなるかを考てコメントアウトで書きましょう
  // 「相手のHPを回復させる」も同様に簡単な数式で書いてみましょう。
  // 例: 魔法使いのMP - 3 = 残りの魔法使いのMP など

  heal(target){//相手のHPを回復する
    if (this.mp >= 3) {//魔法使いのMPが3以上ある場合
      //残りの魔法使いMP = 魔法使いのMP - 3
      this.mp = this.mp - 3;
      //相手のHP = 相手のHP + 15
      target.hp = target.hp + 15;
    }
  }

  fireSpell(target) {
    /* 
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
  }
}

{
  const fighter = new Character({
    name: '武道家',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}