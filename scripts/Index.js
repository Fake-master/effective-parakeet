import { system, world } from "@minecraft/server";

world.beforeEvents.chatSend.subscribe((ev) => {
  const player = ev.sender
  const msg = ev.message
  let nameRegex = /(\w+) (\d+)/;

  if (msg.startsWith("#")) {
    ev.cancel = true
    let match = msg.match(nameRegex);
    if (match) {
      let playerLevel = player.level;
      let minutes = parseInt(match[2], 10);
      let seconds = minutes * 60;
      let ticks = seconds * 20;
      let effectName = `${match[1].replace("#", "")}`;
      if (playerLevel < minutes) {
        player.sendMessage("You don't have enough xp! :(")
        return;
      }
      system.run(() => {effect(player, effectName, ticks, minutes)});
    } else {
      player.sendMessage("#<effect: Effect> <minutes: int>")
      return;
    }
  }
});

function effect(player, effectName, ticks, minutes) {
  try {
    player.addEffect(effectName, ticks)
    player.addLevels(-minutes)
    player.sendMessage('Effect added')
  } catch (error) {
    player.sendMessage(error)
  }
}

world.afterEvents.chatSend.subscribe((ev) => {
  const message = ev.message;
  const mathExpressionRegex = /(\d+(\.\d+)?([+\-*/%]\d+(\.\d+)?)+)/;
  const mathExpressionMatched = message.match(mathExpressionRegex);
  if (mathExpressionMatched) {
    const expression = mathExpressionMatched[1];
    const result = eval(expression);
    world.sendMessage(`§b<Armin>§r ${result}`)
    return;
  }
  return;
});