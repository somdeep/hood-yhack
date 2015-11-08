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
        playerCursor = db.playerprofiles.find({"playerId":str(p)})
        for cursor in playerCursor:
            pp = cursor;
        points = pp['stats']['points']
        points += rnd.randint(0, 40)
        score += points
        rebounds = pp['stats']['rebounds']
        rebounds += rnd.randint(0, 22)
        assists = pp['stats']['assists']
        assists += rnd.randint(0, 18)
        steals = pp['stats']['steals']
        steals += rnd.randint(0, 7)

        result = db.playerprofiles.update_one(
                { "playerId": str(p) },
                {
                    "$set": {"stats.points": points, "stats.rebounds":rebounds, "stats.assists":assists, "stats.steals":steals}
                }
            )
        playerCursor = db.playerprofiles.find({"playerId":str(p)})
        for cursor in playerCursor:
            pp = cursor;

    return score

# creating teams and players
teamCount = 100

totalPlayers = 0
minPlayerIndex = 1
for teamId in range(1, teamCount+1):
    playerCount = rnd.randint(5, 10)

    totalPlayers += playerCount
    teamMembers = range(minPlayerIndex, minPlayerIndex + playerCount)
    minPlayerIndex = minPlayerIndex + playerCount
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
                        "lost": 0,
                        "rating": 1300.00,
                    }
                }
            )


##print "############################### MATCH INSERTION BEGINS ###################"

# creating match statistics
matchCount = 2000;

for matchId in range(1, matchCount+1):
    team1Id = rnd.randint(1, teamCount)
    team2Id = rnd.randint(1, teamCount)
    while team2Id == team1Id:
        team2Id = rnd.randint(1, teamCount)

    team1Cursor = db.teamprofiles.find({"teamId":str(team1Id)})
    team2Cursor = db.teamprofiles.find({"teamId":str(team2Id)})
    for t in team1Cursor:
        team1 = t
    players1 = team1['teamMembers']

    for t in team2Cursor:
        team2 = t
    players2 = team2['teamMembers']

    player1Stats = {}
    player2Stats = {}
    score1 = 0
    score2 = 0


    mvp1 = rnd.randint(0, len(players1))
    mvp2 =rnd.randint(0, len(players2))


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

    rating1 = team1['stats']['rating'];
    rating2 = team2['stats']['rating'];
    print rating1
    print rating2
    expect1 = 1.0 / (1.0 + pow(10, (1.0 * (rating2 - rating1) / 400)))
    expect2 = 1.0 / (1.0 + pow(10, (1.0 * (rating1 - rating2) / 400)))
    print expect1
    print expect2

    rating1 = rating1 + 20 * (win1 - expect1)
    rating2 = rating2 + 20 * (win2 - expect2)
    print rating1
    print rating2
    print "***************************"

    win1 = team1['stats']['won'] + win1;
    lost1 = team1['stats']['lost'] + loss1;

    win2 = team2['stats']['won'] + win2;
    lost2 = team2['stats']['lost'] + loss2;

    result = db.teamprofiles.update_one(
        { "teamId": str(team1Id) },
        {
            "$set": {"stats.won":win1, "stats.lost":lost1, "stats.rating":rating1}
        }
    )
    print result.matched_count
    print result.modified_count
    result = db.teamprofiles.update_one(
        { "teamId": str(team2Id) },
        {
            "$set": {"stats.won":win2, "stats.lost":lost2, "stats.rating":rating2}
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


