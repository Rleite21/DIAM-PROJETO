from beer_budies.models import Universidade;

for uni in Universidade.objects.all():
    print(uni.sigla)