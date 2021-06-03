import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def run():
    try:
        with open('./import_file.csv', 'r', encoding='utf-8') as file:
            attributes_names = {}
            year = 1991
            for index, line in enumerate(file):
                items = line.split(';')
                items = [i.replace('\n', '').replace('\ufeff', '') for i in items]
                if index == 0:
                    attributes_names = items
                    doc_name_index = items.index('year')
                    print(f'doc_name_index: {doc_name_index}')
                else:
                  data = dict(zip(attributes_names, items))
                  print(data)
                  
                  doc_ref = db.collection('LibertadoresFinals').document(data.get('year')).set(data)

    except ImportError as error:
        print(error)
        print('Something went wrong...')
    

if __name__ == '__main__':
    run()
