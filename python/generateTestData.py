from pymongo import MongoClient
import names
import random as rnd
import radar
import datetime

client = MongoClient()
db = client.Database1

positions = ["Point Guard", "Shooting Guard", "Small forward", "Power Forward", "Center"];

hoods = ["Upper Manhattan", "Marble Hill", "Inwood", "Fort George", "Washington Heights", "West Harlem", "Hamilton Heights", "Manhattanville", "Morningside Heights", "South of Harlem", "Central Harlem", "Harlem", "Marcus Garvey Park", "Mount Morris Historical District", "Upper East Side", "Silk Stocking District", "Lenox Hill", "Carnegie Hill", "Yorkville", "Upper West Side", "Manhattan Valley", "Bloomingdale District", "Midtown neighborhoods", "Name of the neighborhood",
"Columbus Circle"]

def updatePlayerStats(players):
    score = 0
    for p in players:
        #print "**********************************"
        #print "P ", p
        playerCursor = db.playerprofiles.find({"playerId":str(p)})
        for cursor in playerCursor:
            pp = cursor;
        #print "Retrieved player\n", pp
        points = pp['stats']['points']
        #print "previous points", points
        points += rnd.randint(0, 40)
        #print "points", points
        score += points
        rebounds = pp['stats']['rebounds']
        #print "previous rebounds", rebounds
        rebounds += rnd.randint(0, 22)
        #print "rebounds", rebounds
        assists = pp['stats']['assists']
        #print "previous assists", assists
        assists += rnd.randint(0, 18)
        #print "assists", assists
        steals = pp['stats']['steals']
        #print "previous steals", steals
        steals += rnd.randint(0, 7)
        #print "steals", steals

        result = db.playerprofiles.update_one(
                { "playerId": str(p) },
                {
                    "$set": {"stats.points": points, "stats.rebounds":rebounds, "stats.assists":assists, "stats.steals":steals}
                }
            )
        #print "matched results", result.matched_count
        #print "modified results", result.modified_count
        #print "P ", p
        playerCursor = db.playerprofiles.find({"playerId":str(p)})
        for cursor in playerCursor:
            pp = cursor;
        #print "Retrieved player\n", pp

    return score

# creating teams and players
teamCount = 100

totalPlayers = 0
minPlayerIndex = 1
for teamId in range(1, teamCount+1):
    ###print "teamId", teamId
    playerCount = rnd.randint(5, 10)
    ##print "playerCount = ", playerCount

    totalPlayers += playerCount
    ###print "playercount ", playerCount
    #teamMembers = range((teamId-1) * playerCount + 1, teamId * playerCount + 1)
    teamMembers = range(minPlayerIndex, minPlayerIndex + playerCount)
    minPlayerIndex = minPlayerIndex + playerCount
    ##print "teamMembers : ", teamMembers
    hood = hoods[rnd.randint(0, 24)]
    for player in teamMembers:
        result = db.playerprofiles.insert_one(
                {
                    "playerId": str(player),
                    "name": names.get_full_name(),
                    "teamId": teamId,
                    "position": positions[rnd.randint(0, 4)],
                    "hood": hood,
                    "stats":
                        {
                            "points": 0,
                            "rebounds": 0,
                            "assists": 0,
                            "steals": 0
                        }
                }
            )

    result = db.teamprofiles.insert_one(
            {
                "teamId": str(teamId),
                "name": names.get_last_name(),
                "warCry": "Let the hack begin",
                "hood": hood,
                "teamMembers":teamMembers,
                "stats" :
                    {
                        "won": 0,
                        "lost": 0
                    }
                }
            )

###print totalPlayers

##print "############################### MATCH INSERTION BEGINS ###################"

# creating match statistics
matchCount = 2000;

for matchId in range(1, matchCount+1):
    team1Id = rnd.randint(1, teamCount)
    ###print "id1", team1Id
    team2Id = rnd.randint(1, teamCount)
    ###print "id2", team2Id
    while team2Id == team1Id:
        team2Id = rnd.randint(1, teamCount)

    team1Cursor = db.teamprofiles.find({"teamId":str(team1Id)})
    team2Cursor = db.teamprofiles.find({"teamId":str(team2Id)})
    for t in team1Cursor:
        team1 = t
    ##print "team1\n", team1
    players1 = team1['teamMembers']
    ##print "players1\n", players1

    for t in team2Cursor:
        team2 = t
    ##print "team2\n", team2
    players2 = team2['teamMembers']
    ##print "players1\n", players1

    player1Stats = {}
    player2Stats = {}
    score1 = 0
    score2 = 0


    mvp1 = rnd.randint(0, len(players1))
    ##print "mvp1", mvp1
    mvp2 =rnd.randint(0, len(players2))
    ##print "mvp2", mvp2

    ##print "score1", score1
    ##print "score2", score2

    # updating player stats
    score1 = updatePlayerStats(players1)
    score2 = updatePlayerStats(players2)

    # updating teams win-lose stat
    win1 = win2 = loss1 = loss2 = 0
    if score1 > score2:
        win1 = 1
        loss2 = 1
    else:
        win2 = 1
        loss1 = 1

    win1 = team1['stats']['won'] + win1;
    print team1
    print '------------win1', win1
    lost1 = team1['stats']['lost'] + loss1;

    win2 = team2['stats']['won'] + win2;
    print team1
    print '------------win1', win1
    lost2 = team2['stats']['lost'] + loss2;

    print "team1Id", team1Id
    result = db.teamprofiles.update_one(
        { "teamId": str(team1Id) },
        {
            "$set": {"stats.won":win1, "stats.lost":lost1}
        }
    )
    print '-----------', result.matched_count
    print '-----------', result.modified_count
    result = db.teamprofiles.update_one(
        { "teamId": str(team2Id) },
        {
            "$set": {"stats.won":win2, "stats.lost":lost2}
        }
    )

    result = db.matches.insert_one(
            {
                "id": matchId,
                "team1Id": team1Id,
                "team2Id": team2Id,
                "date": datetime.datetime.combine(radar.random_date(), datetime.time()),
                "team1Score": score1,
                "team2Score": score2,
                "mvpId1": mvp1,
                "mvpId2": mvp2
                }
            )

    ##print result

