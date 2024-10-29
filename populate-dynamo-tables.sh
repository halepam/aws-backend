    # id -  uuid (Primary key)
    # title - text, not null
    # description - text
    # price - integer
    
aws dynamodb execute-statement --statement "INSERT INTO Products VALUE {
      'id': 'f3d231eb-5e1f-459d-a39e-486d31019110',
      'title': 'FVP 495K6 Multi-V',
      'description': 'some desc',
      'price': 34.75,
      'createdAt': '1729485150'
    }"

aws dynamodb execute-statement --statement "INSERT INTO Products VALUE {
      'id': '6d7ad215-8781-4e85-a08d-f0de50292540',
      'title': 'DAYCO 5060495DR Drive Rite',
      'description': 'some desc',
      'price': 22.99,
      'createdAt': '1729485152'
    }"

aws dynamodb execute-statement --statement "INSERT INTO Products VALUE {
      'id': 'dc6ac741-c2ed-4c5d-8431-85869c8d7b52',
      'title': 'BANDO 6PK1255',
      'description': 'some desc',
      'price': 18.22,
      'createdAt': '1729485154'
    }"
                            
aws dynamodb execute-statement --statement "INSERT INTO Products VALUE { 
      'id': '98e37377-f02a-4846-b657-1142a14f24c0',
      'title': 'CONTINENTAL 6PK1256',
      'description': 'some desc',
      'price': 90.96,
      'createdAt': '1729485226'
    }"

aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': 'f3d231eb-5e1f-459d-a39e-486d31019110',
      'count': 2,
      'createdAt': '1729486906'
    }"
aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': '6d7ad215-8781-4e85-a08d-f0de50292540',
      'count': 4,
      'createdAt': '1729486927'
    }"
aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': 'dc6ac741-c2ed-4c5d-8431-85869c8d7b52',
      'count': 10,
      'createdAt': '1729486943'
    }"
aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': '98e37377-f02a-4846-b657-1142a14f24c0',
      'count': 50,
      'createdAt': '1729486959'
    }"

