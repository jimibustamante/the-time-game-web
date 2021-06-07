import requests
import lxml.html as html
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


CHAMTIONS_URL = 'https://en.wikipedia.org/wiki/List_of_European_Cup_and_UEFA_Champions_League_finals'
XPATH_MAIN_TABLE = '/html/body/div[3]/div[3]/div[5]/div[1]/table[3]/tbody'
XPATH_YEAR = './th/a/text()'
XPATH_INFO_LINK = './th/a/@href'

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def run():
    try:
        response = requests.get(CHAMTIONS_URL)
        if response.status_code == 200:
            page = response.content.decode('utf-8')
            parsed = html.fromstring(page)
            rows = parsed.xpath(XPATH_MAIN_TABLE + '/tr[not(@class)]')
            for row in rows:
                if len(row.xpath(XPATH_YEAR)) == 0:
                    continue
                year = row.xpath(XPATH_YEAR)[0]
                infoLink = row.xpath(XPATH_INFO_LINK)[0]
                winner = row.xpath('./td/a/text()')[0]
                loser = row.xpath('./td/a/text()')[2]
                description = winner
                data = {
                    'year': str(year).split('–')[0],
                    'infoLink': infoLink,
                    'name': f'{winner} - {loser}',
                    'description': description,
                }
                print(data)
                db.collection('ChampionsFinals').document(year).set(data)
        else:
            raise ValueError(f'Error: {response.status_code}')

    except ValueError as value_error:
        print(value_error)


if __name__ == '__main__':
    run()

 