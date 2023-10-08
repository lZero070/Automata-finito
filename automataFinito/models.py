from django.db import models


class Historial(models.Model):
    palabrasIngresadas =  models.CharField(max_length=6)
    estadoDelaPalabra =  models.CharField(max_length=200)
