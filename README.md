# monsterreactgame

## Battle

- Battle active in UI
- Compute whose turn it is ...
- Action e.g. Attack
- Next turn is triggered, again do init stuff
- Wait for action

### possible states for a monster

- isTarget
- isNext
- possible Target
- atm. hovered

### what to do after each turn

- check if there is a winner
- update turnqueue
- reset ui stuff

### todos

- [] split active battles and "quests"(contains 3 battles)
- [] rewards
- [x] notifications
- [] improve ui(more info for battles, better feedback when hit)

## future todos

- []find solution for ai mons; they should be garbage collected after fight?
- []add skills
- []add items
- []login

## done

- [x]monster overview for logged in player
- [x]add logged in player
- [x]improve ui (hide buttons when not needed)
- [x]real damage calculation
- [x]use router
