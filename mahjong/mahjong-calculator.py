    
def sameType(set):
    for i in range(1,len(set)):
        if not set[0][1]==set[i][1]:
            return False
    return True

def ascending(set):
    set = sorted(set)
    for i in range(1,len(set)):
        if not set[i-1][0] < set[i][0]:
            return False
    return True
    
def isChi(set):
    # Check that the types are all equal
    return sameType(set) and ascending(set)
    
def noTerminals(set):
    # Check every card for a terminal number
    for i in range(0,len(set)):
        if set[i][0]==1 or set[i][0]==9:
            return False
    return True

def isPung(set):
    # check that the cards are identical
    for i in range(1,len(set)):
        if not set[0]==set[i]:
            return False
    return True
    
def checkEach(cardList,func):
    for i in range(0,len(cardList)):
        if not func(cardList):
            return False
    return True

def getSuit(set):
    if isPung(set) or sameType(set):
        return set[0][1]
    else:
        return -1
    
def isHonorCard(card):
    return isHonor(card[1])
def isHonor(val):
    return val=='D' or val=='W'
def isNumCard(card):
    return isNum(card[1])
def isNum(val):
    return val=='C' or val=='B' or val=='R'

def osinwrap(val):
    return isNum([-1,val])

def oneSuit(cardList):
    # checks for one suit, pure, then mixed
    suits = []
    for i in range(0,len(cardList)):
        suits.append(getSuit(cardList[i]))
        
    if any(suits)==-1:
        return 0
    elif all(suits)==suits[0]:
        print('One Suit')
        return 20
    else:
        # we check whether there is an overall similar suit
        i = 0
        while i < len(suits):
            if not isNum(suits[i]):
                suits.remove(suits[i])
        suits = filter(osinwrap,suits)
        if all(suits)==suits[0]:
            print('One Suit + Honors')
            return 8
        else:
            return 0

def calculate(cardList,concealedList):
    value = 0
    # TRIVIALS
    # all concealed
    if all(concealedList)==True:
        value = value + 1
        print('All Concealed')
    # all chi
    if checkEach(cardList[0:len(cardList)-1],isChi):
        value = value + 1
        print('All Chi')
    # no terminals
    if checkEach(cardList[0:len(cardList)],noTerminals):
        value = value + 1
        print('No Terminals')
        
    # one suit
    value = value + oneSuit(cardList)
    
    # One-Suit
    return value
        
def calculateWrapper(cardList,wasDrawn):
    None

set1 = ['RD','RD','RD']
set2 = ['GD','GD','GD']
set3 = ['1C','2C','3C']
set4 = ['1C','1C','1C']
pair = ['WD','WD']
cardList = [set1,set2,set3,set4,pair]
concList = [True,True,True,True,True]
value = calculate(cardList,concList)
print(value)

print(oneSuit(cardList))