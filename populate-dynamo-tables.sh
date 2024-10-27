    # id -  uuid (Primary key)
    # title - text, not null
    # description - text
    # price - integer
    
aws dynamodb execute-statement --statement "INSERT INTO Products VALUE {
      'id': '1',
      'title': 'FVP 495K6 Multi-V',
      'description': 'some desc',
      'price': 34.75,
      'createdAt': '1729485150'
    }"

aws dynamodb execute-statement --statement "INSERT INTO Products VALUE {
      'id': '2',
      'title': 'DAYCO 5060495DR Drive Rite',
      'description': 'some desc',
      'price': 22.99,
      'createdAt': '1729485152'
    }"

aws dynamodb execute-statement --statement "INSERT INTO Products VALUE {
      'id': '3',
      'title': 'BANDO 6PK1255',
      'description': 'some desc',
      'price': 18.22,
      'createdAt': '1729485154'
    }"
                            
aws dynamodb execute-statement --statement "INSERT INTO Products VALUE { 
      'id': '4',
      'title': 'CONTINENTAL 6PK1256',
      'description': 'some desc',
      'price': 90.96,
      'createdAt': '1729485226'
    }"

aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': '1',
      'count': 2,
      'createdAt': '1729486906'
    }"
aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': '2',
      'count': 4,
      'createdAt': '1729486927'
    }"
aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': '3',
      'count': 10,
      'createdAt': '1729486943'
    }"
aws dynamodb execute-statement --statement "INSERT INTO Stock VALUE { 
      'product_id': '4',
      'count': 50,
      'createdAt': '1729486959'
    }"

