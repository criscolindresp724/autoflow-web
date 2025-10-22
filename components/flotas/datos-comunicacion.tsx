'use client'
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button";
export default function DatosComunicacionForm() {
    const [formData, setformData] = useState()
    const [AgregarDepartamento, SetAgregarDepartamento] = useState(false)

    type DepartamentoType = {
        nombreDepartamento: string;
        gerencia: {
            telefonoFijo: string;
            celular1: string;
            celular2: string;
            whatsapp: string;
        },
        ventas: {
            telefonoFijo: string;
            celular1: string;
            celular2: string;
            whatsapp: string;
        },
        produccion: {
            telefonoFijo: string;
            celular1: string;
            celular2: string;
            whatsapp: string;
        },
        suministros: {
            telefonoFijo: string;
            celular1: string;
            celular2: string;
            whatsapp: string;
        },

    }
    const [Departamentos, SetDepartamentos] = useState<DepartamentoType[]>([])
    const [NuevoDepartamento, SetNuevoDepartamento] = useState<DepartamentoType>()
    return (
        <Card>


            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Datos de comunicacion</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={() => SetAgregarDepartamento(true)}>Agregar departamento</Button>
                {
                    /*Agreagar un input donde se ingrese el departamento y por cada departamento editar esos campos */
                }
                {
                    AgregarDepartamento && <Card>


                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Agregar Nuevo departamento</CardTitle>
                            <aside className="flex gap-2">
                                <Button variant="default" onClick={() => { SetDepartamentos(prev => [...prev, NuevoDepartamento]), SetAgregarDepartamento(false) }}>Guardar departamento</Button>
                                <Button variant="destructive" onClick={() => SetAgregarDepartamento(false)}>Cerrar</Button>
                            </aside>
                        </CardHeader>
                        <CardContent>
                            <section className="grid grid-cols-3 gap-3">

                                <div className="grid gap-2">
                                    <Label htmlFor="identificacion_fiscal">Nombre departamento</Label>
                                    <Input
                                        id="identificacion_fiscal"
                                        name="identificacion_fiscal"
                                        type="text"
                                        // value={formData.identificacion_fiscal}
                                        onChange={(e) => {
                                            SetNuevoDepartamento({
                                                ...NuevoDepartamento!,
                                                nombreDepartamento: e.target.value
                                            })
                                        }}
                                        maxLength={80}
                                        required
                                        placeholder="Nombre del departamento"
                                    />
                                </div>
                                <fieldset className="border p-4 rounded-md col-span-3">

                                    <legend className="text-xl font-bold">Gerencia</legend>
                                    <aside className="grid grid-cols-4 gap-2">

                                        <div className="grid gap-2">
                                            <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                            <Input
                                                id="telefonoFijo"
                                                name="telefonoFijo"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Telefono Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        gerencia: { ...NuevoDepartamento.gerencia, telefonoFijo: e.target.value }
                                                    })
                                                }}

                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular1">Celular 1</Label>
                                            <Input
                                                id="celular1"
                                                name="celular1"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 1 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        gerencia: { ...NuevoDepartamento.gerencia, celular1: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular2">Celular 2</Label>
                                            <Input
                                                id="celular2"
                                                name="celular2"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 2 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        gerencia: { ...NuevoDepartamento.gerencia, celular2: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="whatsapp">Whatsapp</Label>
                                            <Input
                                                id="whatsapp"
                                                name="whatsapp"
                                                type="text"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        gerencia: { ...NuevoDepartamento.gerencia, whatsapp: e.target.value }
                                                    })
                                                }}
                                                maxLength={80}
                                                required
                                                placeholder="whatsapp Gerencia"
                                            />
                                        </div>
                                    </aside>


                                </fieldset>
                                <fieldset className="border p-4 rounded-md col-span-3">

                                    <legend className="text-xl font-bold">Ventas</legend>
                                    <aside className="grid grid-cols-4 gap-2">

                                        <div className="grid gap-2">
                                            <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                            <Input
                                                id="telefonoFijo"
                                                name="telefonoFijo"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 1 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        ventas: { ...NuevoDepartamento.ventas, telefonoFijo: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular1">Celular 1</Label>
                                            <Input
                                                id="celular1"
                                                name="celular1"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 1 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        ventas: { ...NuevoDepartamento.ventas, celular1: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular2">Celular 2</Label>
                                            <Input
                                                id="celular2"
                                                name="celular2"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 2 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        ventas: { ...NuevoDepartamento.ventas, celular2: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="whatsapp">Whatsapp</Label>
                                            <Input
                                                id="whatsapp"
                                                name="whatsapp"
                                                type="text"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        ventas: { ...NuevoDepartamento.ventas, whatsapp: e.target.value }
                                                    })
                                                }}
                                                maxLength={80}
                                                required
                                                placeholder="whatsapp Gerencia"
                                            />
                                        </div>
                                    </aside>


                                </fieldset>
                                <fieldset className="border p-4 rounded-md col-span-3">

                                    <legend className="text-xl font-bold">Produccion</legend>
                                    <aside className="grid grid-cols-4 gap-2">

                                        <div className="grid gap-2">
                                            <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                            <Input
                                                id="telefonoFijo"
                                                name="telefonoFijo"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 1 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        produccion: { ...NuevoDepartamento.produccion, telefonoFijo: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular1">Celular 1</Label>
                                            <Input
                                                id="celular1"
                                                name="celular1"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 1 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        produccion: { ...NuevoDepartamento.produccion, celular1: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular2">Celular 2</Label>
                                            <Input
                                                id="celular2"
                                                name="celular2"
                                                type="text"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        produccion: { ...NuevoDepartamento.produccion, celular2: e.target.value }
                                                    })
                                                }}
                                                maxLength={80}
                                                required
                                                placeholder="Celular 2 Gerencia"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="whatsapp">Whatsapp</Label>
                                            <Input
                                                id="whatsapp"
                                                name="whatsapp"
                                                type="text"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        produccion: { ...NuevoDepartamento.produccion, whatsapp: e.target.value }
                                                    })
                                                }}
                                                maxLength={80}
                                                required
                                                placeholder="whatsapp Gerencia"
                                            />
                                        </div>
                                    </aside>


                                </fieldset>
                                <fieldset className="border p-4 rounded-md col-span-3">

                                    <legend className="text-xl font-bold">Suministros</legend>
                                    <aside className="grid grid-cols-4 gap-2">

                                        <div className="grid gap-2">
                                            <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                            <Input
                                                id="telefonoFijo"
                                                name="telefonoFijo"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 1 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        suministros: { ...NuevoDepartamento.suministros, telefonoFijo: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular1">Celular 1</Label>
                                            <Input
                                                id="celular1"
                                                name="celular1"
                                                type="text"
                                                maxLength={80}
                                                required
                                                placeholder="Celular 1 Gerencia"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        suministros: { ...NuevoDepartamento.suministros, celular1: e.target.value }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="celular2">Celular 2</Label>
                                            <Input
                                                id="celular2"
                                                name="celular2"
                                                type="text"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        suministros: { ...NuevoDepartamento.suministros, celular2: e.target.value }
                                                    })
                                                }}
                                                maxLength={80}
                                                required
                                                placeholder="Celular 2 Gerencia"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="whatsapp">Whatsapp</Label>
                                            <Input
                                                id="whatsapp"
                                                name="whatsapp"
                                                type="text"
                                                onChange={(e) => {
                                                    SetNuevoDepartamento({
                                                        ...NuevoDepartamento!,
                                                        suministros: { ...NuevoDepartamento.suministros, whatsapp: e.target.value }
                                                    })
                                                }}
                                                maxLength={80}
                                                required
                                                placeholder="whatsapp Gerencia"
                                            />
                                        </div>
                                    </aside>


                                </fieldset>


                            </section>
                        </CardContent>
                    </Card>
                }

                {
                    Departamentos.map((dep) => (
                        <Card>


                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{dep.nombreDepartamento}</CardTitle>
                                <Button variant="destructive" onClick={() => SetDepartamentos(prev => [...Departamentos.filter((d) => d.nombreDepartamento != dep.nombreDepartamento)])}>Eliminar</Button>
                            </CardHeader>
                            <CardContent>
                                <section className="grid grid-cols-3 gap-3">

                                    <div className="grid gap-2">
                                        <Label htmlFor="identificacion_fiscal">Nombre departamento</Label>
                                        <Input
                                            readOnly
                                            id="identificacion_fiscal"
                                            name="identificacion_fiscal"
                                            type="text"
                                            value={dep.nombreDepartamento}
                                            maxLength={80}
                                            required
                                            placeholder="Nombre del departamento"
                                        />
                                    </div>
                                    <fieldset className="border p-4 rounded-md col-span-3">

                                        <legend className="text-xl font-bold">Gerencia</legend>
                                        <aside className="grid grid-cols-4 gap-2">

                                            <div className="grid gap-2">
                                                <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                                <Input
                                                    readOnly
                                                    id="telefonoFijo"
                                                    name="telefonoFijo"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    value={dep.gerencia?.telefonoFijo}
                                                    placeholder="Celular 1 Gerencia"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular1">Celular 1</Label>
                                                <Input
                                                    readOnly
                                                    id="celular1"
                                                    name="celular1"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    value={dep.gerencia?.celular1}
                                                    placeholder="Celular 1 Gerencia"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular2">Celular 2</Label>
                                                <Input
                                                    readOnly
                                                    id="celular2"
                                                    name="celular2"
                                                    type="text"
                                                    value={dep.gerencia?.celular2}
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 2 Gerencia"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                                <Input
                                                    readOnly
                                                    id="whatsapp"
                                                    name="whatsapp"
                                                    type="text"
                                                    value={dep.gerencia?.whatsapp}
                                                    maxLength={80}
                                                    required
                                                    placeholder="whatsapp Gerencia"
                                                />
                                            </div>
                                        </aside>


                                    </fieldset>
                                    <fieldset className="border p-4 rounded-md col-span-3">

                                        <legend className="text-xl font-bold">Ventas</legend>
                                        <aside className="grid grid-cols-4 gap-2">

                                            <div className="grid gap-2">
                                                <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                                <Input
                                                    readOnly
                                                    id="telefonoFijo"
                                                    name="telefonoFijo"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 1 Gerencia"
                                                    value={dep.ventas?.telefonoFijo}

                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular1">Celular 1</Label>
                                                <Input
                                                    readOnly
                                                    id="celular1"
                                                    name="celular1"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 1 Gerencia"
                                                    value={dep.ventas?.celular1}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular2">Celular 2</Label>
                                                <Input
                                                    readOnly
                                                    id="celular2"
                                                    name="celular2"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 2 Gerencia"
                                                    value={dep.ventas?.celular2}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                                <Input
                                                    readOnly
                                                    id="whatsapp"
                                                    name="whatsapp"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="whatsapp Gerencia"
                                                    value={dep.ventas?.whatsapp}
                                                />
                                            </div>
                                        </aside>


                                    </fieldset>
                                    <fieldset className="border p-4 rounded-md col-span-3">

                                        <legend className="text-xl font-bold">Produccion</legend>
                                        <aside className="grid grid-cols-4 gap-2">

                                            <div className="grid gap-2">
                                                <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                                <Input
                                                    readOnly
                                                    id="telefonoFijo"
                                                    name="telefonoFijo"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 1 Gerencia"
                                                    value={dep.produccion?.telefonoFijo}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular1">Celular 1</Label>
                                                <Input
                                                    readOnly
                                                    id="celular1"
                                                    name="celular1"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 1 Gerencia"
                                                    value={dep.produccion?.celular1}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular2">Celular 2</Label>
                                                <Input
                                                    readOnly
                                                    id="celular2"
                                                    name="celular2"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 2 Gerencia"
                                                    value={dep.produccion?.celular2}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                                <Input
                                                    readOnly
                                                    id="whatsapp"
                                                    name="whatsapp"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="whatsapp Gerencia"
                                                    value={dep.produccion?.whatsapp}
                                                />
                                            </div>
                                        </aside>


                                    </fieldset>
                                    <fieldset className="border p-4 rounded-md col-span-3">

                                        <legend className="text-xl font-bold">Suministros</legend>
                                        <aside className="grid grid-cols-4 gap-2">

                                            <div className="grid gap-2">
                                                <Label htmlFor="telefonoFijo">Telefono fijo</Label>
                                                <Input
                                                    readOnly
                                                    id="telefonoFijo"
                                                    name="telefonoFijo"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 1 Gerencia"
                                                    value={dep.suministros?.telefonoFijo}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular1">Celular 1</Label>
                                                <Input
                                                    readOnly
                                                    id="celular1"
                                                    name="celular1"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 1 Gerencia"
                                                    value={dep.suministros?.celular1}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="celular2">Celular 2</Label>
                                                <Input
                                                    readOnly
                                                    id="celular2"
                                                    name="celular2"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="Celular 2 Gerencia"
                                                    value={dep.suministros?.celular2}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                                <Input
                                                    readOnly
                                                    id="whatsapp"
                                                    name="whatsapp"
                                                    type="text"
                                                    maxLength={80}
                                                    required
                                                    placeholder="whatsapp Gerencia"
                                                    value={dep.suministros?.whatsapp}
                                                />
                                            </div>
                                        </aside>


                                    </fieldset>


                                </section>
                            </CardContent>
                        </Card>
                    ))
                }

            </CardContent>
        </Card>

    )
}