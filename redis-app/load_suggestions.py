import pickle as pk
from collections import defaultdict
import redis 

r = redis.StrictRedis(host='localhost', port=6379, db=2)

with open("suggest_title_jTokens") as infile:
	dd = pk.load(infile)
	count = 0
	for k,v in dd.iteritems():
		if count % 10000 == 0:
			print count
		count += 1
		v_list = sorted(dd[k].items(),key=lambda x: x[1], reverse = True)
		#prune all words that cooccur less than 5 times
		v_list = filter(lambda x : x[1]>=5, v_list)
		r.set(k,v_list)