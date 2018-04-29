from app import rdb_01
import ast 
from collections import Counter

N = 10

def get_suggestions(query):
	split_query = query.split(" ")
	all_suggestions = Counter()
	try:
		for term in split_query:
			term_suggestions = ast.literal_eval(rdb_01.get(term))
			all_suggestions+= Counter(dict(term_suggestions))
		return map(lambda x: x[0], all_suggestions.most_common(N))
	except:
		return []