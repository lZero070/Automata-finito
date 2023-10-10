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
    docExterno=open("C:/Users/lgniw/OneDrive/Documents/GitHub/Automata-finito/automataFinito/vista/static/grafo.html")
    plt=Template(docExterno.read())
    docExterno.close()
    ctx=Context()
    documento=plt.render(ctx)
    return HttpResponse(documento)



@csrf_exempt
def construirAutomata(request):
    nfa = NFA(
        states={'q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15'},
        input_symbols={'a', 'b'},
        transitions={
            'q0': {'a': {'q1'}},
            'q1': {'b': {'q2'}},
            'q2': {'b': {'q3'}, 'a': {'q11'}},
            'q3': {'a': {'q4'}},
            'q4': {'b': {'q5'}},
            'q5': {'b': {'q6'}, 'a':{'q13'}},
            'q6': {'a': {'q7'}},
            'q7': {'b': {'q8'}},
            'q8': {'b': {'q9'}, 'a':{'q15'}}, 
            'q9': {'a': {'q10'}},
            'q10':{},
            'q11': {'b': {'q12'}},
            'q12': {'a': {'q13'}, 'b':{'q6'}},
            'q13': {'b': {'q14'}},
            'q14': {'a': {'q15'}, 'b':{'q9'}},
            'q15':{},
        },
        initial_state='q0',
        final_states={'q1', 'q4', 'q7', 'q10', 'q11', 'q13', 'q15'}
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
    docExterno=open("C:/Users/lgniw/OneDrive/Documents/GitHub/Automata-finito/automataFinito/vista/static/grafo.html")
    plt=Template(docExterno.read())
    docExterno.close()
    ctx=Context({'resultado': resultado, 'palabra': palabra, 'nfa': nfa})
    documento=plt.render(ctx)
    return HttpResponse(documento)

@csrf_exempt
def historial(request):
    historial_palabras = Historial.objects.all()
    docExterno=open("C:/Users/lgniw/OneDrive/Documents/GitHub/Automata-finito/automataFinito/vista/static/grafo.html")
    plt=Template(docExterno.read())
    docExterno.close()
    ctx=Context({'historial':historial_palabras})
    documento=plt.render(ctx)
    return HttpResponse(documento)