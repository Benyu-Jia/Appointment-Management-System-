import requests

json_data = {'a': 1, 'b': 2}

r = requests.get("http://10.26.16.147:5000/api/test")

print(r.headers)
print(r.text)