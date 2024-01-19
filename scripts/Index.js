import { world } from "@minecraft/server";

async function cursed() {}

world.beforeEvents.chatSend.subscribe(async (ev) => {
  const player = ev.sender
  const msg = ev.message
  let nameRegex = /(\w+) (\d+)/;

  if (msg.startsWith("#")) {
    ev.cancel = true
    let match = msg.match(nameRegex);
    if (match) {
      let value = parseInt(match[2], 10);
      let seconds = value * 60;
      let effectName = `${match[1].replace("#", "")} ${seconds}`;
      await cursed();
      effect(player, effectName, value);
      return;
    } else {
      player.sendMessage("#<effect: Effect> <minutes: int>")
      return;
    }
  }
}
);

function effect(player, effectName, value) {
  if (player.runCommand(`xp -${value.toString()}L @s[lm=${value.toString()}]`).successCount !== 0) {
    player.runCommand(`effect @s ${effectName}`)
    return;
  } else {
    player.sendMessage("You don't have enough xp! :(")
    return;
  }
}

world.afterEvents.chatSend.subscribe( (ev) => {
  const player = ev.sender;
  const message = ev.message;
  const mathExpressionRegex = /(\d+(\.\d+)?([+\-*/%]\d+(\.\d+)?)+)/;
  const mathExpressionMatched = message.match(mathExpressionRegex);
  if (mathExpressionMatched) {
    const expression = mathExpressionMatched[1];
    const result = eval(expression);
    player.sendMessage(`§b<Armin>§r ${result}`)
    return;
  }
  return;
}
);