import os
from django.urls import path
from django.shortcuts import render
from django.http import HttpResponse 
from automata.fa.nfa import NFA
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import Historial

@csrf_exempt
def grafo(request):
    docExterno=open("C:/Users/lgniw/OneDrive/Desktop/Compiladores2023/automataFinito-main/automataFinito(Actualizacion01)/automataFinito/vista/static/grafo.html")
    plt=Template(docExterno.read())
    docExterno.close()
    ctx=Context()
    documento=plt.render(ctx)
    return HttpResponse(documento)

 

@csrf_exempt
def construirAutomata(request):
    nfa = NFA(
        states={'q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'},
        input_symbols={'a', 'b'},
        transitions={
            'q0': {'a': {'q1'}, 'b': {'q2'}},
            'q1': {'a': {'q3'}},
            'q2': {'a': {'q4'}, 'b': {'q8'}},
            'q3': {'a': {'q5'}, 'b':{'q2'}},
            'q4': {'a': {'q7'}},
            'q5': {'a': {'q6'}, 'b':{'q9'}},
            'q6': {'a': {'q7'}, 'b': {'q9'}},
            'q7': {'a': {'q8'}, 'b': {'q8'}},
            'q8': {},
            'q9': {},
        },
        initial_state='q0',
        final_states={'q8', 'q9'}
    )
    palabra = request.POST.get('palabra', '') # Obtener la palabra del usuario
    resultado = None
    
    if nfa.accepts_input(palabra):
        resultado=f'La cadena "{palabra}" es aceptada por el autómata.'
    else:
        resultado=f'La cadena "{palabra}" es rechazada por el autómata.'
        if palabra=="" or (palabra.count(" ")==len(palabra)):
            resultado='no ha ingresado ninguna palabra'
   
    Historial(palabrasIngresadas=palabra, estadoDelaPalabra=resultado).save()
    docExterno=open("C:/Users/lgniw/OneDrive/Desktop/Compiladores2023/automataFinito-main/automataFinito(Actualizacion01)/automataFinito/vista/static/grafo.html")
    plt=Template(docExterno.read())
    docExterno.close()
    ctx=Context({'resultado': resultado, 'palabra': palabra, 'nfa': nfa})
    documento=plt.render(ctx)
    return HttpResponse(documento)
   
@csrf_exempt
def historial(request):
    historial_palabras = Historial.objects.all()
    docExterno=open("C:/Users/lgniw/OneDrive/Desktop/Compiladores2023/automataFinito-main/automataFinito(Actualizacion01)/automataFinito/vista/static/grafo.html")
    plt=Template(docExterno.read())
    docExterno.close()
    ctx=Context({'historial':historial_palabras})
    documento=plt.render(ctx)
    return HttpResponse(documento)